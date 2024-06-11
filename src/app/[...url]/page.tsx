import React from "react";

import { notFound } from "next/navigation";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { ProductCard } from "@/components/product/product-card";
import { Page } from "@/modules/page";
import { CmsPagesQueryDocument } from "@/queries/page.queries";
import { ProductsQueryDocument } from "@/queries/product.queries";
import { RouteDocument } from "@/queries/route.queries";
import {
  CmsPagesQuery,
  CmsPagesQueryVariables,
  ProductsQuery,
  ProductsQueryVariables,
  RouteQuery,
  RouteQueryVariables,
} from "@/types";
import { generatePrettyUrl } from "@/utils/helpers";
import { baseHygraphClient, baseMagentoClient } from "@/utils/lib/graphql";

import Category from "./category";
import Product from "./product";

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

async function getRoute(url: string) {
  return await baseMagentoClient.request<RouteQuery, RouteQueryVariables>(
    RouteDocument,
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

export default async function Home({ params, searchParams }: Props) {
  const url = generatePrettyUrl(params.url, {
    removeTrailSlash: true,
  });

  const routeData = await getRoute(url);

  if (routeData.route?.type === "PRODUCT") {
    if (routeData.route.__typename === "SimpleProduct") {
      if (!routeData.route.sku) {
        return notFound();
      }
      return <Product sku={routeData.route.sku} />;
    }

    if (routeData.route.__typename === "ConfigurableProduct") {
      if (!routeData.route.sku) {
        return notFound();
      }
      return <Product sku={routeData.route.sku} />;
    }
  }

  if (routeData.route?.type === "CATEGORY") {
    return <Category params={params} searchParams={searchParams} />;
  }

  const data = await getPage(`/${url}`);
  const productsData = await getProducts();

  return (
    <>
      <Page data={data} />

      <ContainerLayout>
        <Debugger data={routeData} />
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
