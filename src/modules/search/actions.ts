"use server";

import { CmsPagesQueryDocument } from "@/queries/page.queries";
import { ProductsQueryDocument } from "@/queries/product/product.queries";
import {
  CmsPagesQuery,
  CmsPagesQueryVariables,
  ProductsQuery,
  ProductsQueryVariables,
} from "@/types";
import { baseHygraphClient, baseMagentoClient } from "@/utils/lib/graphql";

export async function searchProducts(query: string) {
  return await baseMagentoClient("GET").request<
    ProductsQuery,
    ProductsQueryVariables
  >(ProductsQueryDocument, {
    search: query,
    filter: {},
    sort: {},
    currentPage: 1,
  });
}

export async function searchArticles(query: string) {
  return await baseHygraphClient("GET").request<
    CmsPagesQuery,
    CmsPagesQueryVariables
  >(CmsPagesQueryDocument, {
    where: {
      _search: query,
    },
  });
}
