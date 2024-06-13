import React from "react";

import { notFound } from "next/navigation";

import { ConfigurableProductPage } from "@/modules/product/ConfigurableProduct";
import { SimpleProductPage } from "@/modules/product/SimpleProduct";
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
  const productData = product.products?.items?.[0];

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
