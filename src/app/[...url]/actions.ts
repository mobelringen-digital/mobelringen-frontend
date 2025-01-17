"use server";

import { CategoryQueryDocument } from "@/queries/category.queries";
import { CmsPagesQueryDocument } from "@/queries/page.queries";
import {
  GetProductReviewsDocument,
  ProductsQueryDocument,
  ProductsStoresDocument,
} from "@/queries/product/product.queries";
import { RouteDocument } from "@/queries/route.queries";
import {
  CategoryQuery,
  CategoryQueryVariables,
  CmsPagesQuery,
  CmsPagesQueryVariables,
  ProductsQuery,
  ProductsQueryVariables,
  ProductsStoresQuery,
  ProductsStoresQueryVariables,
  RouteQuery,
  RouteQueryVariables,
} from "@/types";
import {
  baseHygraphClient,
  baseMagentoClient,
  HYGRAPH_CACHE_TIME,
} from "@/utils/lib/graphql";

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

export async function getProductStores(sku: string) {
  return await baseMagentoClient("GET", {
    revalidate: 600,
    tags: ["products", "stores", sku],
  }).request<ProductsStoresQuery, ProductsStoresQueryVariables>(
    ProductsStoresDocument,
    {
      filter: { sku: { eq: sku } },
      sort: {},
      currentPage: 1,
    },
  );
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
    revalidate: preview ? 0 : HYGRAPH_CACHE_TIME,
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

export async function getProductReviews(productId: string) {
  const data = await baseMagentoClient("GET", {
    tags: ["reviews", productId],
    revalidate: 3600,
  }).request(GetProductReviewsDocument, {
    productId,
  });

  return data.getReviewsByProductId;
}
