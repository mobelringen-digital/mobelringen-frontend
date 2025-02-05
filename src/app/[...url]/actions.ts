"use server";

import { CategoryQueryDocument } from "@/queries/category.queries";
import {
  CmsPageHighPriorityContentEntities,
  CmsPageMediumPriorityContentEntities,
  CmsPagesQueryDocument,
} from "@/queries/page.queries";
import {
  ProductsQueryDocument,
  ProductsStoresDocument,
} from "@/queries/product/product.queries";
import { RouteDocument } from "@/queries/route.queries";
import {
  CategoryQuery,
  CategoryQueryVariables,
  EntityWhereInput,
  PageWhereInput,
  ProductsQuery,
  ProductsQueryVariables,
  ProductsStoresQuery,
  ProductsStoresQueryVariables,
  RouteQuery,
  RouteQueryVariables,
  Stage,
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

type PageConfig = {
  where: PageWhereInput;
  stage?: Stage;
  first?: number;
  preview?: boolean;
};

async function loadBlockEntities({
  url,
  stage = Stage.Published,
  where,
}: {
  url: string;
  stage: Stage;
  where: Array<{ __typename: string; id: string; stage: Stage }>;
}) {
  // __typename with typename
  const correctedWhere = where.map((w) => {
    return {
      typename: w.__typename,
      id: w.id,
      stage: w.stage,
    };
  }) as EntityWhereInput[];

  const highPriorityBlocks = await baseHygraphClient("GET", {
    tags: ["page", "high-priority-blocks", url, stage],
    revalidate: HYGRAPH_CACHE_TIME.HIGH_PRIORITY,
  }).request(CmsPageHighPriorityContentEntities, {
    where: correctedWhere,
  });

  const mediumPriorityBlocks = await baseHygraphClient("GET", {
    tags: ["page", "medium-priority-blocks", url, stage],
    revalidate: HYGRAPH_CACHE_TIME.MEDIUM_PRIORITY,
  }).request(CmsPageMediumPriorityContentEntities, {
    where: correctedWhere,
  });

  return [
    ...(highPriorityBlocks.entities ?? []),
    ...(mediumPriorityBlocks.entities ?? []),
  ];
}

export async function getPage(
  config: PageConfig = {
    first: 1,
    where: {},
    stage: Stage.Published,
    preview: false,
  },
) {
  const page = await baseHygraphClient("GET", {
    tags: [
      "page",
      JSON.stringify(config.where.url),
      config.stage ?? Stage.Published,
    ],
    revalidate: HYGRAPH_CACHE_TIME.HIGH_PRIORITY,
  }).request(CmsPagesQueryDocument, {
    where: config.where,
    stage: config.stage,
    first: config.first,
  });
  const pageContent = page.pages[0].content;

  const blocksData = await loadBlockEntities({
    url: config.where.url ?? "/not-found",
    stage: config.stage as Stage,
    where: pageContent,
  });

  const mappedDataWithContent = pageContent.map((content) => {
    const block = blocksData?.find((b) =>
      "id" in b ? b.id === content.id : null,
    );

    return {
      ...content,
      ...block,
    };
  });

  return {
    ...page.pages[0],
    content: mappedDataWithContent,
  };
}

export async function getRoute(url: string) {
  return await baseMagentoClient("GET").request<
    RouteQuery,
    RouteQueryVariables
  >(RouteDocument, {
    url,
  });
}
