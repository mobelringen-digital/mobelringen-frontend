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

export const CmsDynamicHeaderFragment = graphql(`
  fragment CmsDynamicHeader on DynamicHeader {
    banner {
      ...CmsBanner
    }
    rules {
      ... on RuleBlock {
        contentType
        value
      }
    }
  }
`);

export const CmsStaticPageConfigurationFragment = graphql(`
  fragment CmsStaticPageConfiguration on StaticPageConfiguration {
    dynamicHeader {
      ...CmsDynamicHeader
    }
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
