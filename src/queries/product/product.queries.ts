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

export const ProductStoresFragment = graphql(`
  fragment ProductStores on ProductInterfaceStoreItem {
    address
    external_id
    name
    qty
  }
`);

export const BaseProductFragment = graphql(`
  fragment BaseProduct on ProductInterface {
    __typename
    url_key
    canonical_url
    description {
      html
    }
    stores {
      ...ProductStores
    }
    gift_message_available
    review_count
    image {
      ...ProductImageFragment
    }
    media_gallery {
      ...ProductMediaGallery
    }
    meta_description
    meta_keyword
    meta_title
    name
    new_from_date
    new_to_date
    price_range {
      ...ProductPriceRange
    }
    productBrand {
      brand_image_url
      name
    }
    uid
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
    stock_status
  }
`);

export const ProductAggregationsFragment = graphql(`
  fragment ProductAggregations on Aggregation {
    attribute_code
    count
    frontend_input
    has_more
    label
    options {
      count
      label
      value
    }
    position
    rel_nofollow
  }
`);

export const ProductsQueryDocument = graphql(`
  query Products(
    $pageSize: Int = 12
    $filter: ProductAttributeFilterInput
    $sort: ProductAttributeSortInput
    $currentPage: Int
    $search: String = ""
  ) {
    products(
      pageSize: $pageSize
      filter: $filter
      sort: $sort
      currentPage: $currentPage
      search: $search
    ) {
      total_count
      page_info {
        current_page
        page_size
        total_pages
      }
      aggregations {
        ...ProductAggregations
      }
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

export const ProductReviewsDocument = graphql(`
  query ProductReviews(
    $pageSize: Int = 1
    $filter: ProductAttributeFilterInput
  ) {
    products(pageSize: $pageSize, filter: $filter) {
      items {
        rating_summary
        review_count
        reviews {
          items {
            average_rating
            nickname
            summary
            text
          }
        }
      }
    }
  }
`);

export const ProductStockDocument = graphql(`
  query ProductStock($pageSize: Int = 1, $filter: ProductAttributeFilterInput) {
    products(pageSize: $pageSize, filter: $filter) {
      items {
        is_returnable
        only_x_left_in_stock
        stock_status
      }
    }
  }
`);
export const ProductMeasurementsDocument = graphql(`
  query ProductMeasurements(
    $pageSize: Int = 1
    $filter: ProductAttributeFilterInput
  ) {
    products(pageSize: $pageSize, filter: $filter) {
      items {
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
    }
  }
`);
