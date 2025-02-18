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

export const CmsPagesQueryDocument = graphql(`
  query CmsPages(
    $first: Int = 1
    $stage: Stage = PUBLISHED
    $where: PageWhereInput
  ) {
    pages(where: $where, stage: $stage, first: $first) {
      ...CmsPageDetails
      content(first: 100) {
        __typename
        ... on Entity {
          __typename
          id
          stage
        }
      }
    }
  }
`);

export const CmsPageHighPriorityContentEntities = graphql(`
  query HighPriorityBlocks($where: [EntityWhereInput!]!) {
    entities(where: $where) {
      ... on Banner {
        ...CmsBanner
      }
      ... on BlockRow {
        ...CmsBlockRow
      }
      ... on ProductSlider {
        ...CmsProductSlider
      }
      ... on BlockImageGallery {
        ...CmsImagesGallery
      }
      ... on BlockImageLinksSlider {
        ...CmsBlockImageLinksSlider
      }
      ... on BlockPagesList {
        ...CmsPagesList
      }
      ... on BlockProductsList {
        ...CmsBlockProductsList
      }
      ... on BlockBrandsList {
        ...CmsBlockBrandsList
      }
      ... on BlockSimilarPagesRow {
        ...CmsSimilarPagesRow
      }
    }
  }
`);

export const CmsPageMediumPriorityContentEntities = graphql(`
  query MediumPriorityBlocks($where: [EntityWhereInput!]!) {
    entities(where: $where) {
      ... on BlockQuote {
        ...CmsBlockQuote
      }
      ... on BlockFaq {
        ...CmsBlockFaq
      }
      ... on BlockNavigationButton {
        ...CmsBlockNavigationButtons
      }
      ... on BlockBrand {
        ...CmsBlockBrands
      }
      ... on BlockStoresMap {
        ...CmsBlockStoresMap
      }
      ... on BlockPressRoom {
        ...CmsBlockPressRoom
      }
      ... on BlockFlowbox {
        ...CmsBlockFlowbox
      }
      ... on BlockCatalog {
        ...CmsBlockCatalog
      }
      ... on BlockHtmlCode {
        ...CmsBlockHTMLCode
      }
      ... on BlockStoreElement {
        ...CmsStoreElement
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
      id
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
      id
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
      id
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
      id
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
      id
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
    id
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

export const NotificationFragment = graphql(`
  fragment Notification on Notification {
    id
    content {
      html
    }
    backgroundColor
    textColor
    link
    openLinkInNewWindow
  }
`);

export const NotificationBarsDocument = graphql(`
  query NotificationBar {
    notificationBars {
      position
      content {
        ...Notification
      }
    }
  }
`);
