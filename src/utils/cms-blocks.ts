const BLOCKS_KEYS_MAP = {
  Banner: "banners",
  BlockRow: "blockRows",
  ProductSlider: "productSliders",
  BlockImageGallery: "blockImageGalleries",
  BlockImageLinksSlider: "blockImageLinksSliders",
  BlockPagesList: "blockPagesLists",
  BlockProductsList: "blockProductsLists",
  BlockBrandsList: "blockBrandsLists",
  BlockSimilarPagesRow: "blockSimilarPagesRows",
  BlockQuote: "blockQuotes",
  BlockFaq: "blockFaqs",
  BlockNavigationButton: "blockNavigationButtons",
  BlockBrand: "blockBrands",
  BlockStoresMap: "blockStoresMaps",
  BlockPressRoom: "blockPressRooms",
  BlockFlowbox: "blockFlowboxes",
  BlockCatalog: "blockCatalogs",
  BlockHtmlCode: "blockHtmlCodes",
  BlockStoreElement: "storeElements",
} as const;

export function convertPageDataToBlockIds(
  data: any[],
): Record<
  (typeof BLOCKS_KEYS_MAP)[keyof typeof BLOCKS_KEYS_MAP],
  Array<string>
> {
  const result: Record<
    (typeof BLOCKS_KEYS_MAP)[keyof typeof BLOCKS_KEYS_MAP],
    Array<string>
  > = {} as any;

  data.forEach((item) => {
    const type = item.__typename;
    const key = BLOCKS_KEYS_MAP[type as keyof typeof BLOCKS_KEYS_MAP];

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item.id);
  });

  return result;
}

export const mapToSingleArrayOfBlocks = (d: Record<string, any[]>) => {
  return Object.values(d).reduce((acc, val) => {
    return acc.concat(val);
  }, []);
};
