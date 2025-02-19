import { graphql } from "@/types/schema";

export const SalesBubbleFragment = graphql(`
  fragment CmsSalesBubble on SaleBubble {
    id
    url
    middleLine
    position
    topLine
    bottomLine
    backgroundColor
    textColor
  }
`);

export const TacticalBubbleFragment = graphql(`
  fragment CmsTacticalBubble on TacticalBubble {
    id
    position
    mainBubbleTopLine
    mainBubbleMiddleLine
    mainBubbleBottomLine
    mainBubbleBackgroundColor
    mainBubbleTextColor
    supplementBubbleTopLine
    supplementBubbleMiddleLine
    supplementBubbleBackgroundColor
    supplementBubbleTextColor
    linkUrl
  }
`);

export const PromotionBubbleFragment = graphql(`
  fragment CmsPromotionBubble on PromotionBubble {
    id
    middleLine
    position
    topLine
    links {
      ...CmsLink
    }
    backgroundColor
    textColor
  }
`);

export const HotspotFragment = graphql(`
  fragment Hotspot on ProductHotspot {
    id
    productSku
    verticalPosition
    horizontalPosition
  }
`);

export const BannerFragment = graphql(`
  fragment CmsBanner on Banner {
    ... on Banner {
      __typename
      alt
      id
      linkUrl
      identify
      variant
      centerText
      bannerImage {
        mimeType
        url
        width
      }
      hotspots {
        ...Hotspot
      }
      salesBubble {
        ...CmsSalesBubble
      }
      promoText {
        ...CmsBannerPromo
      }
    }
  }
`);

export const CmsBannerPromo = graphql(`
  fragment CmsBannerPromo on BannerPromo {
    ... on BannerPromo {
      id
      __typename
      topLine
      bottomLine
      backgroundOverlay
      position
      promoImage {
        url
        width
        height
      }
      textColor
      textSize
    }
  }
`);

export const CmsProductSliderFragment = graphql(`
  fragment CmsProductSlider on ProductSlider {
    ... on ProductSlider {
      __typename
      id
      categoryId
      specificProductsSku
      type
      title
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const CmsBlockConfigFragment = graphql(`
  fragment CmsBlockConfig on BlockConfig {
    ... on BlockConfig {
      __typename
      id
      backgroundColor
      hideBlockTitle
      spacingTop {
        desktop
        mobile
      }
      spacingBottom {
        desktop
        mobile
      }
    }
  }
`);

export const CmsPagesListFragment = graphql(`
  fragment CmsPagesList on BlockPagesList {
    ... on BlockPagesList {
      __typename
      id
      pageType
      title
      displayCategories
      pageCategory {
        id
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const CmsSimilarPagesRowFragment = graphql(`
  fragment CmsSimilarPagesRow on BlockSimilarPagesRow {
    ... on BlockSimilarPagesRow {
      __typename
      id
      title
      page {
        ...CmsPageNode
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const CmsImagesGalleryFragment = graphql(`
  fragment CmsImagesGallery on BlockImageGallery {
    ... on BlockImageGallery {
      __typename
      id
      title
      description {
        html
      }
      images {
        ...CmsImage
        ...CmsImageLink
      }
      imagesDirection
      columnsCount
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BlockFaqFragment = graphql(`
  fragment CmsBlockFaq on BlockFaq {
    ... on BlockFaq {
      __typename
      id
      title
      questions {
        question
        answer {
          html
        }
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BlockNavigationButtonsFragment = graphql(`
  fragment CmsBlockNavigationButtons on BlockNavigationButton {
    ... on BlockNavigationButton {
      __typename
      id
      title
      links {
        ...CmsLink
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BlockImageLinksSliderFragment = graphql(`
  fragment CmsBlockImageLinksSlider on BlockImageLinksSlider {
    ... on BlockImageLinksSlider {
      __typename
      id
      title
      images {
        ...CmsImageLink
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BlockBrandsFragment = graphql(`
  fragment CmsBlockBrands on BlockBrand {
    ... on BlockBrand {
      __typename
      id
      title
      viewMoreLink {
        ...CmsLink
      }
      brands {
        ...CmsImageLink
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BlockProductsListFragment = graphql(`
  fragment CmsBlockProductsList on BlockProductsList {
    ... on BlockProductsList {
      __typename
      id
      title
      brand
      categoryId
      sku
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BrandFragment = graphql(`
  fragment CmsBrand on Brand {
    ... on Brand {
      __typename
      id
      brandName
      url
      image {
        url
        width
        height
      }
    }
  }
`);

export const BlockBrandsListFragment = graphql(`
  fragment CmsBlockBrandsList on BlockBrandsList {
    ... on BlockBrandsList {
      __typename
      id
      title
      brands(first: 100) {
        ...CmsBrand
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BlockFlowboxFragment = graphql(`
  fragment CmsBlockFlowbox on BlockFlowbox {
    ... on BlockFlowbox {
      __typename
      id
      flowKey
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);
