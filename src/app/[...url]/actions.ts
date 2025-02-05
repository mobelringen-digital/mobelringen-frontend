"use server";

import { CategoryQueryDocument } from "@/queries/category.queries";
import {
  CmsPageHighPriorityContentBlocks,
  CmsPageMediumPriorityContentBlocks,
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
  convertPageDataToBlockIds,
  mapToSingleArrayOfBlocks,
} from "@/utils/cms-blocks";
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

export async function loadBlocksData(
  url: string,
  ids: Record<string, any[]>,
  stage: Stage = Stage.Published,
) {
  const highPriorityBlocks = await baseHygraphClient("GET", {
    tags: ["page", "high-priority-blocks", url, stage],
    revalidate: HYGRAPH_CACHE_TIME.HIGH_PRIORITY,
  }).request(CmsPageHighPriorityContentBlocks, {
    stage: stage,
    bannersWhere: {
      id_in: ids.banners ?? [],
    },
    blockRowsWhere: {
      id_in: ids.blockRows ?? [],
    },
    productSlidersWhere: {
      id_in: ids.productSliders ?? [],
    },
    blockImagesGalleriesWhere: {
      id_in: ids.blockImagesGalleries ?? [],
    },
    blockImageLinksSlidersWhere: {
      id_in: ids.blockImageLinksSliders ?? [],
    },
    pagesListsWhere: {
      id_in: ids.pagesLists ?? [],
    },
    blockProductsListsWhere: {
      id_in: ids.blockProductsLists ?? [],
    },
    blockBrandsListsWhere: {
      id_in: ids.blockBrandsLists ?? [],
    },
    blockSimilarPagesRowsWhere: {
      id_in: ids.blockSimilarPagesRows ?? [],
    },
  });

  const mediumPriorityBlocks = await baseHygraphClient("GET", {
    tags: ["page", "medium-priority-blocks", url, stage],
    revalidate: HYGRAPH_CACHE_TIME.MEDIUM_PRIORITY,
  }).request(CmsPageMediumPriorityContentBlocks, {
    stage,
    blockQuotesWhere: {
      id_in: ids.blockQuotes ?? [],
    },
    blockFaqsWhere: {
      id_in: ids.blockFaqs ?? [],
    },
    blockNavigationButtonsWhere: {
      id_in: ids.blockNavigationButtons ?? [],
    },
    blockBrandsWhere: {
      id_in: ids.blockBrands ?? [],
    },
    blockStoresMapsWhere: {
      id_in: ids.blockStoresMaps ?? [],
    },
    blockPressRoomsWhere: {
      id_in: ids.blockPressRooms ?? [],
    },
    blockFlowboxesWhere: {
      id_in: ids.blockFlowboxes ?? [],
    },
    blockCatalogsWhere: {
      id_in: ids.blockCatalogs ?? [],
    },
    blockHtmlCodesWhere: {
      id_in: ids.blockHtmlCodes ?? [],
    },
    storeElementsWhere: {
      id_in: ids.storeElements ?? [],
    },
  });

  return [
    ...mapToSingleArrayOfBlocks(highPriorityBlocks as any),
    ...mapToSingleArrayOfBlocks(mediumPriorityBlocks as any),
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
  const data = convertPageDataToBlockIds(page.pages[0].content);
  const blocksData = await loadBlocksData(
    config.where.url as string,
    {
      banners: data.banners,
      blockRows: data.blockRows,
      productSliders: data.productSliders,
      blockImagesGalleries: data.blockImageGalleries,
      blockImageLinksSliders: data.blockImageLinksSliders,
      pagesLists: data.blockPagesLists,
      blockProductsLists: data.blockProductsLists,
      blockBrandsLists: data.blockBrandsLists,
      blockSimilarPagesRows: data.blockSimilarPagesRows,
      blockQuotes: data.blockQuotes,
      blockFaqs: data.blockFaqs,
      blockNavigationButtons: data.blockNavigationButtons,
      blockBrands: data.blockBrands,
      blockStoresMaps: data.blockStoresMaps,
      blockPressRooms: data.blockPressRooms,
      blockFlowboxes: data.blockFlowboxes,
      blockCatalogs: data.blockCatalogs,
      blockHtmlCodes: data.blockHtmlCodes,
      storeElements: data.storeElements,
    },
    config.stage,
  );
  const mappedDataWithContent = pageContent.map((content) => {
    const block = blocksData.find((b) => b.id === content.id);

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
