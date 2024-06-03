import { graphql } from "@/types/schema";

export const PageQueryDocument = graphql(`
  query Pages($url: String!) {
    pages(where: { url: $url }) {
      id
      identify
      metaDescription
      metaTitle
      title
      url
      content {
        ...BannerFragment
        ...PopularProductsFragment
      }
    }
  }
`);
