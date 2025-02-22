import { graphql } from "@/types/schema";

export const CmsLinkFragment = graphql(`
  fragment CmsLink on Link {
    ... on Link {
      __typename
      label
      url
      icon {
        url
      }
    }
  }
`);

export const CmsMegamenuDropdownFragment = graphql(`
  fragment CmsMegamenuDropdown on MegaMenuDropdown {
    __typename
    label
    items {
      ...CmsLink
      ...CmsImageLink
    }
  }
`);

export const CmsMegaMenuCategoriesDropdownFragment = graphql(`
  fragment CmsMegaMenuCategoriesDropdown on MegaMenuCategoriesDropdown {
    __typename
    label
  }
`);

export const CmsLinkBlockFragment = graphql(`
  fragment CmsLinkBlock on LinkBlock {
    __typename
    id
    label
    links {
      ...CmsLink
    }
  }
`);

export const MenuQueryDocument = graphql(`
  query Menu($where: MenuWhereInput) {
    menus(where: $where) {
      menuLocation
      links {
        ... on LinkBlock {
          ...CmsLinkBlock
        }
        ...CmsLink
        ... on MegaMenuCategoriesDropdown {
          ...CmsMegaMenuCategoriesDropdown
        }
        ... on MegaMenuDropdown {
          ...CmsMegamenuDropdown
        }
      }
    }
  }
`);
