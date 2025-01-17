import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { notFound } from "next/navigation";

import getCart from "@/components/cart/actions";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { getSelectedStore } from "@/components/store-selector/actions";
import { ConfigurableProductPage } from "@/modules/product/ConfigurableProduct";
import { ProductDataContextProvider } from "@/modules/product/context/ProductDataContextProvider";
import {
  fetchReviews,
  PRODUCT_REVIEWS_QUERY_KEY,
} from "@/modules/product/information-accordion/reviews/useProductReviewsQuery";
import { SimpleProductPage } from "@/modules/product/SimpleProduct";
import { GetProductStockDocument } from "@/queries/product/product.queries";
import { isTypename } from "@/types/graphql-helpers";
import { baseMagentoClient } from "@/utils/lib/graphql";

import { getProduct, getProductStores } from "./actions";

type Props = {
  sku: string;
  url: string;
};

async function getProductStock(productId: string, storeId: string) {
  return await baseMagentoClient("GET", {
    tags: ["product", "stock", String(productId), String(storeId)],
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
  const configurableProductData =
    products?.[0] && isTypename(products[0], ["ConfigurableProduct"])
      ? products[0]
      : null;
  const currentProductData = products?.[products?.length - 1];

  if (!currentProductData) {
    return notFound();
  }

  const selectedStore = await getSelectedStore();
  const stores = await getProductStores(
    // @ts-expect-error - productData is not null
    currentProductData.sku,
  );

  const stock = await getProductStock(
    // @ts-expect-error - productData is not null
    currentProductData.id,
    selectedStore?.external_id ?? "",
  );

  // Prefetch product Reviews
  const queryClient = new QueryClient();
  if (
    isTypename(currentProductData, ["SimpleProduct", "ConfigurableProduct"])
  ) {
    await queryClient.prefetchQuery({
      queryKey: [...PRODUCT_REVIEWS_QUERY_KEY, String(currentProductData.id)],
      queryFn: () => fetchReviews(String(currentProductData.id)),
    });
  }

  if (
    !!configurableProductData &&
    isTypename(currentProductData, ["SimpleProduct"])
  ) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDataContextProvider
          product={currentProductData}
          stores={stores}
          selectedStore={selectedStore}
          cart={cart}
          stock={stock}
        >
          <ConfigurableProductPage
            configurableProductData={configurableProductData}
          />
        </ProductDataContextProvider>

        <StaticPageContent url={`/${url}`} />
      </HydrationBoundary>
    );
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {isTypename(currentProductData, ["SimpleProduct"]) ? (
          <>
            <link
              rel="canonical"
              href={`${process.env.NEXT_PUBLIC_APP_URL}/${currentProductData.canonical_url}`}
            />
            <ProductDataContextProvider
              product={currentProductData}
              stores={stores}
              selectedStore={selectedStore}
              cart={cart}
              stock={stock}
            >
              <SimpleProductPage />
            </ProductDataContextProvider>
          </>
        ) : null}

        <StaticPageContent url={`/${url}`} />
      </HydrationBoundary>
    </>
  );
}
