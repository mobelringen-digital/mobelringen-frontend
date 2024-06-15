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

export const CmsStaticPageConfigurationFragment = graphql(`
  fragment CmsStaticPageConfiguration on StaticPageConfiguration {
    translations
  }
`);

export const CmsStaticPageConfigurationDocument = graphql(`
  query CmsStaticPageConfiguration(
    $where: StaticPageConfigurationWhereUniqueInput!
  ) {
    staticPageConfiguration(where: $where) {
      ...CmsStaticPageConfiguration
    }
  }
`);

export const CmsDynamicHeaderFragment = graphql(`
  fragment CmsDynamicHeader on DynamicHeader {
    id
    rule {
      ... on RuleBlock {
        id
        value
        contentType
      }
    }
    banner {
      ...CmsBanner
    }
  }
`);

export const CmsDynamicHeadersDocument = graphql(`
  query CmsDynamicHeaders($where: DynamicHeaderWhereInput) {
    dynamicHeaders(where: $where) {
      ...CmsDynamicHeader
    }
  }
`);
