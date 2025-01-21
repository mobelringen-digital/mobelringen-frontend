import React, { Suspense } from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { notFound, redirect } from "next/navigation";

import getCart from "@/components/cart/actions";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { getSelectedStore } from "@/components/store-selector/actions";
import { ConfigurableProductPage } from "@/modules/product/ConfigurableProduct";
import {
  fetchReviews,
  PRODUCT_REVIEWS_QUERY_KEY,
} from "@/modules/product/information-accordion/reviews/useProductReviewsQuery";
import { ProductPageSkeleton } from "@/modules/product/ProductPageSkeleton";
import { SimpleProductPage } from "@/modules/product/SimpleProduct";
import { GetProductStockDocument } from "@/queries/product/product.queries";
import { BaseCartFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { baseMagentoClient } from "@/utils/lib/graphql";

import { getProduct } from "./actions";

type Props = {
  sku: string;
  url: string;
};

async function getProductStock(productId: string, storeId: string) {
  return await baseMagentoClient("GET", {
    tags: ["stock", String(productId), String(storeId)],
    revalidate: 600,
  }).request(GetProductStockDocument, {
    productId,
    storeId,
  });
}

export default async function Product({ sku, url }: Props) {
  const product = await getProduct(sku);
  const cart = await getCart();

  const products = product.products?.items;
  if (products && products.length > 1) {
    const firstProduct = products[0];
    const secondProduct = products[1];

    /**
     * If Magento returns two items with same SKU request, it means that product is either
     * Configurable product or Configurable Product Variant.
     *
     * First returned - Configurable Product (Parent)
     * Second returned - Its variant (Child)
     *
     * When opening a configurable product variant, instead of real product from the list
     * we set variant search param and redirect to its parent configurable product
     */
    if (
      firstProduct &&
      isTypename(firstProduct, ["ConfigurableProduct"]) &&
      secondProduct &&
      isTypename(secondProduct, ["SimpleProduct"])
    ) {
      redirect(`/${firstProduct.canonical_url}?variant=${secondProduct.sku}`);
    }
  }

  const productData = products?.[0];

  if (!productData) {
    return notFound();
  }

  const selectedStore = await getSelectedStore();
  const stock = await getProductStock(
    // @ts-expect-error - productData is not null
    productData.id,
    selectedStore?.external_id ?? "",
  );

  // Prefetch product Reviews
  const queryClient = new QueryClient();
  if (isTypename(productData, ["SimpleProduct", "ConfigurableProduct"])) {
    await queryClient.prefetchQuery({
      queryKey: [...PRODUCT_REVIEWS_QUERY_KEY, String(productData.id)],
      queryFn: () => fetchReviews(String(productData.id)),
    });
  }

  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {isTypename(productData, ["SimpleProduct"]) ? (
          <>
            <link
              rel="canonical"
              href={`${process.env.NEXT_PUBLIC_APP_URL}/${productData.canonical_url}`}
            />
            <SimpleProductPage
              selectedStore={selectedStore}
              stock={stock}
              cart={cart as BaseCartFragment}
              product={productData}
            />
          </>
        ) : null}

        {isTypename(productData, ["ConfigurableProduct"]) ? (
          <>
            <ConfigurableProductPage
              stock={stock}
              cart={cart as BaseCartFragment}
              product={productData}
              selectedStore={selectedStore}
            />
          </>
        ) : null}

        <StaticPageContent url={`/${url}`} />
      </HydrationBoundary>
    </Suspense>
  );
}
