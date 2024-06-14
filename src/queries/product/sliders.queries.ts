import { graphql } from "@/types/schema";

export const ProductSeriesSliderDataFragment = graphql(`
  fragment ProductSeriesSliderData on ProductInterface {
    __typename
    series {
      ...BaseProduct
    }
  }
`);

export const RelatedProductsSliderDataFragment = graphql(`
  fragment RelatedProductsSliderData on ProductInterface {
    __typename
    related_products {
      ...BaseProduct
    }
  }
`);
export const UpsellProductsSliderDataFragment = graphql(`
  fragment UpsellProductsSliderData on ProductInterface {
    __typename
    upsell_products {
      ...BaseProduct
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
