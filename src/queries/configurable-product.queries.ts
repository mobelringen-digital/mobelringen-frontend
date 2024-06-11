import { graphql } from "@/types/schema";

export const ConfigurableProductOptionsFragment = graphql(`
  fragment ConfigurableProductOptions on ConfigurableProductOptions {
    attribute_code
    attribute_id
    id
    label
    position
    use_default
    values {
      default_label
      label
      store_label
      use_default_value
      value_index
    }
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
