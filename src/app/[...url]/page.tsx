import React from "react";

import { Metadata } from "next";

import { notFound } from "next/navigation";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { ProductCard } from "@/components/product/product-card";
import { Page } from "@/modules/page";
import { CmsPagesQueryDocument } from "@/queries/page.queries";
import { ProductsQueryDocument } from "@/queries/product.queries";
import {
  CmsPagesQuery,
  CmsPagesQueryVariables,
  ProductsQuery,
  ProductsQueryVariables,
} from "@/types";
import { generatePrettyUrl } from "@/utils/helpers";
import { baseHygraphClient, baseMagentoClient } from "@/utils/lib/graphql";

type Props = {
  params: { url: Array<string> };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPage(url: string) {
  return await baseHygraphClient.request<CmsPagesQuery, CmsPagesQueryVariables>(
    CmsPagesQueryDocument,
    {
      url,
    },
  );
}

async function getProducts() {
  return await baseMagentoClient.request<ProductsQuery, ProductsQueryVariables>(
    ProductsQueryDocument,
    {
      pageSize: 12,
      filter: { addable_to_cart: { eq: "1" } },
    },
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const url = generatePrettyUrl(params.url);

  const data = await getPage(url);

  if (data.pages.length === 0) {
    return notFound();
  }

  return {
    title: data.pages[0].metaTitle,
    description: data.pages[0].metaDescription,
  };
}

export default async function Home({ params }: Props) {
  const url = generatePrettyUrl(params.url);

  const data = await getPage(url);
  const productsData = await getProducts();

  return (
    <>
      <Page data={data} />
      <ContainerLayout>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {productsData.products?.items?.map((product) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            <ProductCard product={product} key={product?.url_key} />
          ))}
        </div>
      </ContainerLayout>
    </>
  );
}
