import { graphql } from "@/types/schema";

export const SalesBubbleFragment = graphql(`
  fragment CmsSalesBubble on SaleBubble {
    url
    middleLine
    position
    topLine
    bottomLine
  }
`);

export const PromotionBubbleFragment = graphql(`
  fragment CmsPromotionBubble on PromotionBubble {
    middleLine
    position
    topLine
    links {
      ...CmsLink
    }
  }
`);

export const BannerFragment = graphql(`
  fragment CmsBanner on Banner {
    ... on Banner {
      __typename
      alt
      identify
      variant
      centerText
      bannerImage {
        mimeType
        url
        width
      }
      salesBubble {
        ...CmsSalesBubble
      }
    }
  }
`);

export const CmsProductSliderFragment = graphql(`
  fragment CmsProductSlider on ProductSlider {
    ... on ProductSlider {
      __typename
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
    }
  }
`);

export const CmsPagesListFragment = graphql(`
  fragment CmsPagesList on BlockPagesList {
    ... on BlockPagesList {
      __typename
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
      title
      brands {
        ...CmsBrand
      }
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BlockCustomerClubFormFragment = graphql(`
  fragment CmsBlockCustomerClubForm on BlockCustomerClubform {
    ... on BlockCustomerClubform {
      __typename
      title
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);

export const BlockCustomerPaperFragment = graphql(`
  fragment CmsBlockCustomerPaper on BlockCustomerPaper {
    ... on BlockCustomerPaper {
      __typename
      title
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
      flowKey
      blockConfig {
        ...CmsBlockConfig
      }
    }
  }
`);
