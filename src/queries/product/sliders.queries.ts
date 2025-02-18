import { graphql } from "@/types/schema";

export const BaseProductDataForCarFragment = graphql(`
  fragment BaseProductDataForCard on ProductInterface {
    __typename
    name
    sku
    id
    canonical_url
    addable_to_cart
    low_price
    stocks {
      online {
        availability
        stock_info
      }
      cac {
        availability
        stock_info
      }
    }
    productBrand {
      name
    }
    categories {
      name
    }
    short_description {
      html
    }
    price_range {
      ...ProductPriceRange
    }
    image {
      ...ProductImageFragment
    }
    productLabel {
      ...ProductLabel
    }
  }
`);

export const ProductSeriesSliderDataFragment = graphql(`
  fragment ProductSeriesSliderData on ProductInterface {
    __typename
    series {
      ...BaseProductDataForCard
    }
  }
`);

export const RelatedProductsSliderDataFragment = graphql(`
  fragment RelatedProductsSliderData on ProductInterface {
    __typename
    related_products {
      ...BaseProductDataForCard
    }
  }
`);
export const UpsellProductsSliderDataFragment = graphql(`
  fragment UpsellProductsSliderData on ProductInterface {
    __typename
    upsell_products {
      ...BaseProductDataForCard
    }
  }
`);

export const BaseProductSliderDataFragment = graphql(`
  fragment BaseProductSliderData on ProductInterface {
    ...RelatedProductsSliderData
    ...ProductSeriesSliderData
    ...UpsellProductsSliderData
  }
`);

export const ProductSliderDataDocument = graphql(`
  query ProductSliderData(
    $pageSize: Int = 1
    $filter: ProductAttributeFilterInput
  ) {
    products(pageSize: $pageSize, filter: $filter) {
      items {
        __typename
        ...BaseProductSliderData
      }
    }
  }
`);
