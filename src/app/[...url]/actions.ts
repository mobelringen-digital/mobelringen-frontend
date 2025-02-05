"use server";

import { CategoryQueryDocument } from "@/queries/category.queries";
import {
  CmsPagesMediumPriorityBlocksQueryDocument,
  CmsPagesHighPriorityBlocksQueryDocument,
} from "@/queries/page.queries";
import {
  ProductsQueryDocument,
  ProductsStoresDocument,
} from "@/queries/product/product.queries";
import { RouteDocument } from "@/queries/route.queries";
import {
  CategoryQuery,
  CategoryQueryVariables,
  CmsPagesHighPriorityBlocksQuery,
  CmsPagesMediumPriorityBlocksQuery,
  PageWhereInput,
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
import { MergeUnionByTypename } from "@/utils/ts-utils";

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
    tags: ["product", "stores", sku],
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

export type CmsPageType = CmsPagesHighPriorityBlocksQuery["pages"][0] &
  CmsPagesMediumPriorityBlocksQuery["pages"][0];
export type CmsPageContent = MergeUnionByTypename<
  CmsPagesHighPriorityBlocksQuery["pages"][0]["content"],
  CmsPagesMediumPriorityBlocksQuery["pages"][0]["content"]
>;

type PageConfig = {
  where: PageWhereInput;
  first?: number;
  preview?: boolean;
};

export async function getPage(
  config: PageConfig = { first: 1, where: {}, preview: false },
) {
  const highPriorityBlocksData = await baseHygraphClient("GET", {
    tags: ["page", "high-priority", config.where.url ?? ""],
    cache: config.preview ? "no-store" : undefined,
    revalidate: config.preview ? 0 : HYGRAPH_CACHE_TIME.HIGH_PRIORITY,
  }).request(CmsPagesHighPriorityBlocksQueryDocument, {
    where: config.where,
    first: config.first,
  });
  const mediumPriorityBlocksData = await baseHygraphClient("GET", {
    tags: ["page", "medium-priority", config.where.url ?? ""],
    cache: config.preview ? "no-store" : undefined,
    revalidate: config.preview ? 0 : HYGRAPH_CACHE_TIME.MEDIUM_PRIORITY,
  }).request(CmsPagesMediumPriorityBlocksQueryDocument, {
    where: config.where,
    first: config.first,
  });

  if (
    !highPriorityBlocksData?.pages[0] ||
    !mediumPriorityBlocksData?.pages[0]
  ) {
    return null;
  }

  return {
    ...highPriorityBlocksData?.pages[0],
    content: [
      ...highPriorityBlocksData?.pages[0]?.content,
      ...mediumPriorityBlocksData?.pages[0]?.content,
    ],
  } as CmsPageType;
}

export async function getRoute(url: string) {
  return await baseMagentoClient("GET").request<
    RouteQuery,
    RouteQueryVariables
  >(RouteDocument, {
    url,
  });
}
