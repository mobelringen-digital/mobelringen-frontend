import { graphql } from "@/types/schema";

export const SalesBubbleFragment = graphql(`
  fragment CmsSalesBubble on SaleBubble {
    url
    middleLine
    position
    topLine
    bottomLine
  }
`);

export const PromotionBubbleFragment = graphql(`
  fragment CmsPromotionBubble on PromotionBubble {
    middleLine
    position
    topLine
    links {
      ...CmsLink
    }
  }
`);

export const BannerFragment = graphql(`
  fragment CmsBanner on Banner {
    ... on Banner {
      __typename
      alt
      identify
      variant
      centerText
      bannerImage {
        mimeType
        url
        width
      }
      salesBubble {
        ...CmsSalesBubble
      }
    }
  }
`);

export const CmsProductSliderFragment = graphql(`
  fragment CmsProductSlider on ProductSlider {
    ... on ProductSlider {
      __typename
      categoryId
      type
      title
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const CmsBlockConfigFragment = graphql(`
  fragment CmsBlockConfig on BlockConfig {
    ... on BlockConfig {
      __typename
      id
      backgroundColor
    }
  }
`);

export const CmsPagesListFragment = graphql(`
  fragment CmsPagesList on BlockPagesList {
    ... on BlockPagesList {
      __typename
      pageType
      title
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const CmsSimilarPagesRowFragment = graphql(`
  fragment CmsSimilarPagesRow on BlockSimilarPagesRow {
    ... on BlockSimilarPagesRow {
      __typename
      title
      page {
        ...CmsPageNode
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);
