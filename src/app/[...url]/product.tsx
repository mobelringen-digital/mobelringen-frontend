import React from "react";

import { notFound, redirect } from "next/navigation";

import { ConfigurableProductPage } from "@/modules/product/ConfigurableProduct";
import { SimpleProductPage } from "@/modules/product/SimpleProduct";
import { ProductsQueryDocument } from "@/queries/product/product.queries";
import { ProductsQuery, ProductsQueryVariables } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

type Props = {
  sku: string;
};

async function getProduct(sku: string) {
  return await baseMagentoClient.request<ProductsQuery, ProductsQueryVariables>(
    ProductsQueryDocument,
    {
      filter: { sku: { eq: sku } },
    },
  );
}

export default async function Product({ sku }: Props) {
  const product = await getProduct(sku);

  const products = product.products?.items;
  if (products && products.length > 1) {
    const firstProduct = products[0];
    const secondProduct = products[1];

    if (
      firstProduct?.__typename === "ConfigurableProduct" &&
      secondProduct?.__typename === "SimpleProduct"
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
      {productData.__typename === "SimpleProduct" ? (
        <SimpleProductPage product={productData} />
      ) : null}

      {productData.__typename === "ConfigurableProduct" ? (
        <ConfigurableProductPage product={productData} />
      ) : null}
    </>
  );
}
