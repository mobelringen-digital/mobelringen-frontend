import { graphql } from "@/types/schema";

export const BaseCategoryDataFragment = graphql(`
  fragment BaseCategoryData on CategoryTree {
    name
    description
    id
    uid
    url_path
    product_count
    meta_title
    meta_keywords
    meta_description
    thumbnail
    include_in_menu
    products {
      total_count
    }
    children {
      name
      uid
      url_path
      product_count
      include_in_menu
      products {
        total_count
      }
      children {
        name
        uid
        url_path
        product_count
        include_in_menu
        products {
          total_count
        }
      }
    }
  }
`);

export const CategoryQueryDocument = graphql(`
  query Category($filters: CategoryFilterInput) {
    categories(filters: $filters) {
      items {
        name
        default_sort_by
        sort_direction
        description
        id
        uid
        url_path
        product_count
        meta_title
        meta_keywords
        meta_description
        include_in_menu
        products {
          total_count
        }
        children {
          default_sort_by
          sort_direction
          thumbnail
          name
          uid
          url_path
          product_count
          include_in_menu
          products {
            total_count
          }
          children {
            default_sort_by
            sort_direction
            thumbnail
            name
            uid
            url_path
            product_count
            include_in_menu
            products {
              total_count
            }
          }
        }
      }
    }
  }
`);
