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
    description {
      html
    }
    gift_message_available
    image {
      ...ProductImageFragment
    }
    is_returnable
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
    price_range {
      ...ProductPriceRange
    }
    productBrand {
      brand_image_url
      name
    }
    rating_summary
    uid
    stock_status
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
    reviews {
      items {
        average_rating
        nickname
        summary
        text
      }
    }
    addable_to_cart
    categories {
      url_path
      name
    }
    productLabel {
      ...ProductLabel
    }
    delivery_promise
    maintenance_description
    measurement_depth
    measurement_diameter
    measurement_gross_weight
    measurement_height
    measurement_length
    measurement_seat_height
    measurement_thickness
    measurement_volume
    measurement_width
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
