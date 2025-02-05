import { graphql } from "@/types/schema";

export const SeoFragment = graphql(`
  fragment Seo on Seo {
    metaTitle
    metaDescription
    ogImage {
      url
    }
    canonicalUrl
    robots
  }
`);

export const CmsPageNodeFragment = graphql(`
  fragment CmsPageNode on Page {
    id
    url
    title
    seo {
      ...Seo
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

export const CmsPageDetailsFragment = graphql(`
  fragment CmsPageDetails on Page {
    id
    title
    seo {
      ...Seo
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
  }
`);

export const CmsPagesHighPriorityBlocksQueryDocument = graphql(`
  query CmsPagesHighPriorityBlocks($first: Int = 1, $where: PageWhereInput) {
    pages(where: $where, first: $first) {
      ...CmsPageDetails
      content(first: 100) {
        ...CmsBanner
        ...CmsBlockRow
        ...CmsProductSlider
        ...CmsImagesGallery
        ...CmsBlockImageLinksSlider
        ...CmsPagesList
        ...CmsBlockProductsList
        ...CmsBlockBrandsList
        ...CmsSimilarPagesRow
      }
    }
  }
`);

export const CmsPagesMediumPriorityBlocksQueryDocument = graphql(`
  query CmsPagesMediumPriorityBlocks($first: Int = 1, $where: PageWhereInput) {
    pages(where: $where, first: $first) {
      content(first: 100) {
        ...CmsBlockQuote
        ...CmsBlockFaq
        ...CmsBlockNavigationButtons
        ...CmsBlockBrands
        ...CmsBlockStoresMap
        ...CmsBlockPressRoom
        ...CmsBlockFlowbox
        ...CmsBlockCatalog
        ...CmsBlockHTMLCode
        ...CmsStoreElement
      }
    }
  }
`);

/**
 * Dummy query for easier typescript integration
 * TODO: Find a way to remove this query
 */
export const CmsPagesQueryDocument = graphql(`
  query CmsPages($first: Int = 1, $where: PageWhereInput) {
    pages(where: $where, first: $first) {
      ...CmsPageDetails
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
      alt
      width
      height
      salesBubble {
        ...CmsSalesBubble
      }
      promotionBubble {
        ...CmsPromotionBubble
      }
      tacticalBubble {
        ...CmsTacticalBubble
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
      alt
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
      tacticalBubble {
        ...CmsTacticalBubble
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

export const CmsBlockCatalogFragment = graphql(`
  fragment CmsBlockCatalog on BlockCatalog {
    ... on BlockCatalog {
      __typename
      title
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const IPaperDocument = graphql(`
  query IPaper {
    iPapers {
      id
      name
      type
      url
      image
    }
  }
`);

export const CmsBlockHTMLCodeFragment = graphql(`
  fragment CmsBlockHTMLCode on BlockHtmlCode {
    ... on BlockHtmlCode {
      __typename
      title
      markup
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const CmsStoreElement = graphql(`
  fragment CmsStoreElement on BlockStoreElement {
    __typename
    title
    content {
      ...CmsMultipleTextBlock
    }
    backgroundImage {
      url
      width
      height
    }
    blockConfig {
      ...CmsBlockConfig
    }
  }
`);
