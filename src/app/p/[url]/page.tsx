import React from "react";

import { notFound } from "next/navigation";

import { ProductPage } from "@/modules/product";
import { ProductsQueryDocument } from "@/queries/product.queries";
import { ProductsQuery, ProductsQueryVariables } from "@/types";
import { extractProductSkuFromUrl } from "@/utils/helpers";
import { baseMagentoClient } from "@/utils/lib/graphql";

type Props = {
  params: { url: string | Array<string> };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getProduct(sku: string) {
  return await baseMagentoClient.request<ProductsQuery, ProductsQueryVariables>(
    ProductsQueryDocument,
    {
      filter: { sku: { eq: sku } },
    },
  );
}

export default async function Product({ params }: Props) {
  const product = await getProduct(extractProductSkuFromUrl(params.url));

  if (!product.products?.items?.[0]) {
    return notFound();
  }

  return <ProductPage product={product.products.items[0]} />;
}
