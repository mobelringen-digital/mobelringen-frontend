import { graphql } from "@/types/schema";

export const MenuQueryDocument = graphql(`
  query Menu($where: MenuWhereInput) {
    menus(where: $where) {
      links {
        ... on LinkBlock {
          __typename
          id
          label
          links {
            ... on Link {
              __typename
              label
              id
              url
              icon {
                url
              }
            }
          }
        }
        ... on Link {
          __typename
          label
          url
          icon {
            url
          }
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
