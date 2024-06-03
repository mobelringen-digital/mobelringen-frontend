import { graphql } from "@/types/schema";

export const MenuQueryDocument = graphql(`
  query Menu($where: MenuWhereInput) {
    menus(where: $where) {
      links {
        ... on Link {
          __typename
          label
          url
        }
        ... on MegaMenuCategoriesDropdown {
          __typename
          label
        }
        ... on MegaMenuDropdown {
          __typename
          items {
            ... on Link {
              __typename
              label
              url
            }
            ... on ImageLink {
              __typename
              label
              url
              image {
                url
              }
            }
          }
          label
        }
      }
    }
  }
`);
