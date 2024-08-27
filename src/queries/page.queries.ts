import { graphql } from "@/types/schema";

export const CmsPageNodeFragment = graphql(`
  fragment CmsPageNode on Page {
    id
    metaDescription
    metaTitle
    url
    pageThumbnail {
      url
      width
      height
    }
    pageCategory {
      name
    }
    createdAt
  }
`);

export const CmsPagesConnectionDocument = graphql(`
  query CmsPagesConnection(
    $first: Int = 12
    $skip: Int = 0
    $where: PageWhereInput
  ) {
    pagesConnection(where: $where, first: $first, skip: $skip) {
      edges {
        node {
          ...CmsPageNode
        }
      }
      aggregate {
        count
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        pageSize
        startCursor
      }
    }
  }
`);

export const CmsPagesQueryDocument = graphql(`
  query CmsPages($first: Int = 1, $where: PageWhereInput) {
    pages(where: $where, first: $first) {
      id
      metaDescription
      metaTitle
      url
      content(first: 100) {
        ...CmsBanner
        ...CmsProductSlider
        ...CmsBlockRow
        ...CmsBlockQuote
        ...CmsPagesList
        ...CmsSimilarPagesRow
        ...CmsImagesGallery
        ...CmsBlockFaq
      }
    }
  }
`);

export const CmsStaticPageConfigurationDocument = graphql(`
  query CmsStaticPageConfiguration(
    $where: StaticPageConfigurationWhereUniqueInput!
  ) {
    staticPageConfiguration(where: $where) {
      content {
        ...CmsBlockRow
        ...CmsBanner
        ...CmsProductSlider
      }
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

export const CmsImageFragment = graphql(`
  fragment CmsImage on Image {
    ... on Image {
      __typename
      label
      caption
      image {
        url
        width
        height
      }
      width
      height
      salesBubble {
        ...CmsSalesBubble
      }
      promotionBubble {
        ...CmsPromotionBubble
      }
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
      width
      height
      salesBubble {
        ...CmsSalesBubble
      }
      promotionBubble {
        ...CmsPromotionBubble
      }
    }
  }
`);

export const CmsTextBlockFragment = graphql(`
  fragment CmsTextBlock on TextBlock {
    ... on TextBlock {
      __typename
      id
      title {
        html
      }
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
        ...CmsImage
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
      useFullPageWidth
      columns {
        ...CmsColumn
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const CmsBlockQuoteFragment = graphql(`
  fragment CmsBlockQuote on BlockQuote {
    ... on BlockQuote {
      __typename
      id
      image {
        url
        width
        height
      }
      quote {
        html
      }
      author
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);
