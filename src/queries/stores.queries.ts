import { graphql } from "@/types/schema";

export const BaseStoreFragment = graphql(`
  fragment BaseStore on Store {
    __typename
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
  query StoresList {
    getStores {
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
