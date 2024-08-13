import { graphql } from "@/types/schema";

export const CmsPagesQueryDocument = graphql(`
  query CmsPages($url: String!) {
    pages(where: { url: $url }) {
      id
      identify
      metaDescription
      metaTitle
      url
      content {
        ...CmsBanner
        ...CmsProductSlider
        ...CmsBlockRow
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

export const CmsImageLinkFragment = graphql(`
  fragment CmsImageLink on ImageLink {
    ... on ImageLink {
      __typename
      id
      label
      url
      caption
      image {
        url
        width
        height
      }
    }
  }
`);

export const CmsTextBlockFragment = graphql(`
  fragment CmsTextBlock on TextBlock {
    ... on TextBlock {
      __typename
      id
      title
      textAlign
      content {
        html
      }
      links {
        ... on Link {
          id
          label
          url
        }
      }
    }
  }
`);

export const CmsColumnFragment = graphql(`
  fragment CmsColumn on Column {
    ... on Column {
      __typename
      id
      content {
        ...CmsTextBlock
        ...CmsImageLink
      }
      desktopPosition
      mobilePosition
    }
  }
`);

export const CmsBlockRowFragment = graphql(`
  fragment CmsBlockRow on BlockRow {
    ... on BlockRow {
      __typename
      id
      backgroundColor
      useFullPageWidth
      columns {
        ...CmsColumn
      }
    }
  }
`);
