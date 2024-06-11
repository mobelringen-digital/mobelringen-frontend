import { graphql } from "@/types/schema";

export const ConfigurableProductOptionsFragment = graphql(`
  fragment ConfigurableProductOptions on ConfigurableProductOptions {
    __typename
    values {
      default_label
      label
      store_label
      uid
      use_default_value
    }
    attribute_code
    attribute_uid
    label
    position
    uid
    use_default
  }
`);

export const ConfigurableProductVariantsFragment = graphql(`
  fragment ConfigurableProductVariants on ConfigurableVariant {
    __typename
    attributes {
      code
      value_index
    }
    product {
      image {
        url
      }
      url_key
      sku
    }
  }
`);

export const ConfigurableProductFragment = graphql(`
  fragment ConfigurableProduct on ConfigurableProduct {
    __typename
    ...BaseProduct
    configurable_options {
      ...ConfigurableProductOptions
    }
    variants {
      ...ConfigurableProductVariants
    }
  }
`);
