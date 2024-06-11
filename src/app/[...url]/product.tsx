import React from "react";

import { notFound } from "next/navigation";

import { ProductPage } from "@/modules/product";
import { ProductsQueryDocument } from "@/queries/product.queries";
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

  if (!product.products?.items?.[0]) {
    return notFound();
  }

  return (
    <>
      <title>
        {product.products.items[0].meta_title ??
          product.products?.items[0].name}
      </title>
      <meta
        name="description"
        content={product.products.items[0].meta_description ?? ""}
      />
      <ProductPage product={product.products.items[0]} />
    </>
  );
}
