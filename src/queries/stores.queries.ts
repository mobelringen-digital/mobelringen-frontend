import { graphql } from "@/types/schema";

export const BaseStoreFragment = graphql(`
  fragment BaseStore on Store {
    city
    country
    email
    externalUrl
    external_id
    id
    is_visible_on_map
    latitude
    longitude
    name
    opening_hours {
      additionalInformation
      friday
      monday
      saturday
      sunday
      thursday
      tuesday
      wednesday
    }
    organization_number
    phone
    postcode
    region
    street
  }
`);

export const StoresListDocument = graphql(`
  query StoresList($searchInput: String, $coordinates: CoordinatesInput, $geolocation: Boolean) {
    getStores(searchInput: $searchInput, coordinates: $coordinates, geolocation: $geolocation) {
      ...BaseStore
    }
  }
`);

export const StoreDocument = graphql(`
  query Store($id: String!) {
    getStore(storeId: $id) {
      ...BaseStore
    }
  }
`);

export const UpdateCartItemsIsInStore = graphql(`
  mutation UpdateCartItemsIsInStore($cartId: String!, $storeId: String!) {
    updateCartItemsIsInStore(cartId: $cartId, storeId: $storeId) {
      success
      message
    }
  }
`);

export const CmsStoreFragment = graphql(`
  fragment CmsStore on Store {
    storeName
    topBanner {
      url
      width
      height
    }
    seo {
      metaTitle
      metaDescription
    }
    bottomImage {
      ...CmsImageLink
    }
    content {
      ...CmsMultipleTextBlock
    }
    hoursDescription {
      ...CmsTextBlock
    }
  }
`);

export const CmsStoreDocument = graphql(`
  query CmsStore($where: StoreWhereInput) {
    stores(where: $where) {
      ...CmsStore
    }
  }
`);
