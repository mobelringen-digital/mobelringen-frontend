import { graphql } from "@/types/schema";

export const CategoryQueryDocument = graphql(`
  query Category($filters: CategoryFilterInput) {
    categories(filters: $filters) {
      items {
        name
        description
        id
        uid
        url_path
        product_count
        meta_title
        meta_keywords
        meta_description
        include_in_menu
        children {
          name
          uid
          url_path
          product_count
          include_in_menu
          children {
            name
            uid
            url_path
            product_count
            include_in_menu
          }
        }
      }
    }
  }
`);
