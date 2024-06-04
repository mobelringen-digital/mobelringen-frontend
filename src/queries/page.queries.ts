import { graphql } from "@/types/schema";

export const CmsPagesQueryDocument = graphql(`
  query CmsPages($url: String!) {
    pages(where: { url: $url }) {
      id
      identify
      metaDescription
      metaTitle
      title
      url
      content {
        ...CmsBanner
        ...CmsPopularProducts
      }
    }
  }
`);
