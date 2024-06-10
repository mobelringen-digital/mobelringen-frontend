import { graphql } from "@/types/schema";

export const ProductImageFragment = graphql(`
  fragment ProductImageFragment on ProductImage {
    url
    position
    label
    disabled
  }
`);

export const ProductVideoFragment = graphql(`
  fragment ProductVideoFragment on ProductVideo {
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
    disabled
    label
    position
    url
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

export const ProductsQueryDocument = graphql(`
  query Products($pageSize: Int = 12, $filter: ProductAttributeFilterInput) {
    products(pageSize: $pageSize, filter: $filter) {
      items {
        url_path
        url_key
        url_suffix
        canonical_url
        brand
        color
        configuration
        country_of_manufacture
        description {
          html
        }
        gift_message_available
        id
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
        updated_at
        uid
        type_id
        tier_price
        swatch_image
        stock_status
        staged
        special_to_date
        special_price
        special_from_date
        small_image {
          disabled
          label
          position
          url
        }
        sku
        size_filter
        short_description {
          html
        }
        series_group
        review_count
        webshopavailable
        addable_to_cart
        attribute_set_id
        created_at
        delivery_promise
        ifsite
        maintenance_description
        series {
          url_path
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
    }
  }
`);
