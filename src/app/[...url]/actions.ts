"use server";

import { CategoryQueryDocument } from "@/queries/category.queries";
import { CmsPagesQueryDocument } from "@/queries/page.queries";
import { ProductsQueryDocument } from "@/queries/product/product.queries";
import { RouteDocument } from "@/queries/route.queries";
import {
  CategoryQuery,
  CategoryQueryVariables,
  CmsPagesQuery,
  CmsPagesQueryVariables,
  ProductsQuery,
  ProductsQueryVariables,
  RouteQuery,
  RouteQueryVariables,
} from "@/types";
import { baseHygraphClient, baseMagentoClient } from "@/utils/lib/graphql";

export async function getProduct(sku: string) {
  return await baseMagentoClient("GET").request<
    ProductsQuery,
    ProductsQueryVariables
  >(ProductsQueryDocument, {
    filter: { sku: { eq: sku } },
    sort: {},
    currentPage: 1,
  });
}

export async function getCategory(url: string) {
  return await baseMagentoClient("GET").request<
    CategoryQuery,
    CategoryQueryVariables
  >(CategoryQueryDocument, {
    filters: { url_path: { eq: url } },
  });
}

export async function getPage(url: string, preview?: boolean) {
  return await baseHygraphClient("GET", {
    cache: preview ? "no-store" : undefined,
    revalidate: preview ? 0 : 86400,
  }).request<CmsPagesQuery, CmsPagesQueryVariables>(CmsPagesQueryDocument, {
    where: {
      url,
    },
  });
}

export async function getRoute(url: string) {
  return await baseMagentoClient("GET").request<
    RouteQuery,
    RouteQueryVariables
  >(RouteDocument, {
    url,
  });
}
