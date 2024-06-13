import React from "react";

import { notFound } from "next/navigation";

import { Page } from "@/modules/page";
import { CmsPagesQueryDocument } from "@/queries/page.queries";
import { RouteDocument } from "@/queries/route.queries";
import {
  CmsPagesQuery,
  CmsPagesQueryVariables,
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

export default async function Home({ params }: Props) {
  const url = generatePrettyUrl(params.url, {
    removeTrailSlash: true,
  });

  const routeData = await getRoute(url);

  if (routeData.route?.type === "PRODUCT") {
    if (
      routeData.route.__typename === "SimpleProduct" ||
      routeData.route.__typename === "ConfigurableProduct"
    ) {
      if (!routeData.route.sku) {
        return notFound();
      }

      return <Product sku={routeData.route.sku} />;
    }
  }

  if (routeData.route?.type === "CATEGORY") {
    return <Category url={url} />;
  }

  const data = await getPage(`/${url}`);

  return <Page data={data} />;
}
