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

export const PopularProductsFragment = graphql(`
  fragment CmsPopularProducts on PopularProduct {
    ... on PopularProduct {
      __typename
      id
      categoryId
    }
  }
`);
