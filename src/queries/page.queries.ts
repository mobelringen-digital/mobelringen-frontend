import { graphql } from "@/types/schema";

export const CmsPageNodeFragment = graphql(`
  fragment CmsPageNode on Page {
    id
    url
    title
    seo {
      metaTitle
      metaDescription
      ogImage {
        url
      }
    }
    pageThumbnail {
      url
      width
      height
    }
    pageCategory {
      name
      categoryUrl
    }
    createdAt
  }
`);

export const CmsPagesConnectionDocument = graphql(`
  query CmsPagesConnection(
    $first: Int = 12
    $skip: Int = 0
    $where: PageWhereInput
    $orderBy: PageOrderByInput = createdAt_DESC
  ) {
    pagesConnection(
      where: $where
      first: $first
      skip: $skip
      orderBy: $orderBy
    ) {
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
      title
      seo {
        metaTitle
        metaDescription
        ogImage {
          url
        }
      }
      createdAt
      pageThumbnail {
        url
        width
        height
      }
      pageCategory {
        name
        categoryUrl
      }
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
        ...CmsBlockNavigationButtons
        ...CmsBlockImageLinksSlider
        ...CmsBlockBrands
        ...CmsBlockStoresMap
        ...CmsBlockPressRoom
        ...CmsBlockProductsList
        ...CmsBlockBrandsList
        ...CmsBlockCustomerClubForm
        ...CmsBlockCustomerPaper
        ...CmsBlockFlowbox
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

export const CmsMultipleTextBlockFragment = graphql(`
  fragment CmsMultipleTextBlock on MultipleTextBlock {
    ... on MultipleTextBlock {
      __typename
      id
      paragraphs {
        ...CmsTextBlock
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
      paragraphTypography
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
        ...CmsMultipleTextBlock
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

export const CmsBlockStoresMapFragment = graphql(`
  fragment CmsBlockStoresMap on BlockStoresMap {
    ... on BlockStoresMap {
      __typename
      title
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const CmsPageCategoriesDocument = graphql(`
  query CmsPageCategories($where: PageCategoryWhereInput) {
    pageCategories(where: $where, orderBy: name_ASC) {
      id
      name
      categoryUrl
      pageType
    }
  }
`);

export const CmsBlockPressRoomFragment = graphql(`
  fragment CmsBlockPressRoom on BlockPressRoom {
    ... on BlockPressRoom {
      __typename
      title
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);
