import React from "react";

import { notFound, redirect } from "next/navigation";

import getCart from "@/components/cart/actions";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { ConfigurableProductPage } from "@/modules/product/ConfigurableProduct";
import { SimpleProductPage } from "@/modules/product/SimpleProduct";
import { ProductsQueryDocument } from "@/queries/product/product.queries";
import { ProductsQuery, ProductsQueryVariables } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { baseMagentoClient } from "@/utils/lib/graphql";

type Props = {
  sku: string;
  url: string;
};

async function getProduct(sku: string) {
  return await baseMagentoClient("GET").request<
    ProductsQuery,
    ProductsQueryVariables
  >(ProductsQueryDocument, {
    filter: { sku: { eq: sku } },
    sort: {},
    currentPage: 1,
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

  return (
    <>
      {isTypename(productData, ["SimpleProduct"]) ? (
        <SimpleProductPage cart={cart} product={productData} />
      ) : null}

      {isTypename(productData, ["ConfigurableProduct"]) ? (
        <ConfigurableProductPage cart={cart} product={productData} />
      ) : null}

      <StaticPageContent url={`/${url}`} />
    </>
  );
}
