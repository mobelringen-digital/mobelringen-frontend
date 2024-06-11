import { graphql } from "@/types/schema";

export const ProductImageFragment = graphql(`
  fragment ProductImageFragment on ProductImage {
    __typename
    url
    position
    label
    disabled
  }
`);

export const ProductVideoFragment = graphql(`
  fragment ProductVideoFragment on ProductVideo {
    __typename
    disabled
    label
    position
    url
    video_content {
      media_type
      video_description
      video_metadata
      video_provider
      video_title
      video_url
    }
  }
`);

export const ProductMediaGalleryFragment = graphql(`
  fragment ProductMediaGallery on MediaGalleryInterface {
    __typename
    disabled
    label
    position
    url
    ... on ProductImage {
      ...ProductImageFragment
    }
    ... on ProductVideo {
      ...ProductVideoFragment
    }
  }
`);

export const ProductLabelFragment = graphql(`
  fragment ProductLabel on Label {
    custom
    discount
    new
  }
`);

export const ProductPriceRangeFragment = graphql(`
  fragment ProductPriceRange on PriceRange {
    maximum_price {
      discount {
        amount_off
        percent_off
      }
      final_price {
        currency
        value
      }
      fixed_product_taxes {
        amount {
          currency
          value
        }
        label
      }
      regular_price {
        currency
        value
      }
    }
    minimum_price {
      discount {
        amount_off
        percent_off
      }
      final_price {
        currency
        value
      }
      fixed_product_taxes {
        amount {
          currency
          value
        }
        label
      }
      regular_price {
        currency
        value
      }
    }
  }
`);

export const BaseProductFragment = graphql(`
  fragment BaseProduct on ProductInterface {
    __typename
    url_key
    url_suffix
    canonical_url
    country_of_manufacture
    description {
      html
    }
    gift_message_available
    image {
      ...ProductImageFragment
    }
    is_returnable
    manufacturer
    media_gallery {
      ...ProductMediaGallery
    }
    meta_description
    meta_keyword
    meta_title
    name
    new_from_date
    new_to_date
    only_x_left_in_stock
    options_container
    price_range {
      ...ProductPriceRange
    }
    productBrand {
      brand_image_url
      name
    }
    product_links {
      link_type
      linked_product_sku
      linked_product_type
      position
      sku
      ... on ProductLinks {
        link_type
        linked_product_sku
        linked_product_type
        position
        sku
      }
    }
    rating_summary
    uid
    swatch_image
    stock_status
    staged
    special_to_date
    special_price
    small_image {
      disabled
      label
      position
      url
    }
    sku
    short_description {
      html
    }
    review_count
    addable_to_cart
    series {
      url_key
      sku
      image {
        url
      }
      name
    }
    categories {
      url_path
      name
    }
    productLabel {
      ...ProductLabel
    }
  }
`);

export const ProductsQueryDocument = graphql(`
  query Products($pageSize: Int = 12, $filter: ProductAttributeFilterInput) {
    products(pageSize: $pageSize, filter: $filter) {
      items {
        ... on SimpleProduct {
          ...SimpleProduct
        }
        ... on ConfigurableProduct {
          ...ConfigurableProduct
        }
      }
    }
  }
`);
