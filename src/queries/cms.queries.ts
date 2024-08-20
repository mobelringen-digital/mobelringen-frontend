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
