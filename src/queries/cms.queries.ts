import { graphql } from "@/types/schema";

export const BannerFragment = graphql(`
  fragment BannerFragment on Banner {
    ... on Banner {
      __typename
      alt
      identify
      bannerImage {
        mimeType
        url
        width
      }
    }
  }
`);

export const PopularProductsFragment = graphql(`
  fragment PopularProductsFragment on PopularProduct {
    ... on PopularProduct {
      __typename
      id
      categoryId
    }
  }
`);
