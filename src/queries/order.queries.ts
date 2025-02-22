import { graphql } from "@/types/schema";

export const MaskedOrderFragment = graphql(`
  fragment MaskedOrder on CustomerOrder {
    increment_id
    id
    selected_store
    items {
      image
      name
      link
      price
      quantity
      sku
    }
    coordinates {
      lat
      lng
    }
    payment_methods {
      name
      type
      additional_data {
        name
        value
      }
    }
    shipping_address {
      city
      company
      country_code
      fax
      firstname
      lastname
      middlename
      postcode
      prefix
      region
      region_id
      street
      suffix
      vat_id
    }
    billing_address {
      city
      company
      country_code
      fax
      firstname
      lastname
      middlename
      postcode
      prefix
      region
      region_id
      street
      suffix
      telephone
      vat_id
    }
    carrier
    comments {
      message
      timestamp
    }
    currency
    delivery_type
    delivery_type_title
    email
    id
    number
    order_date
    price
    printed_card_included
    shipping_method
    status
    status_label
    store
    token
    total {
      grand_total {
        currency
        value
      }
      total_shipping {
        currency
        value
      }
      discounts {
        amount {
          currency
          value
        }
        label
      }
    }
  }
`);

export const MaskedOrderDocument = graphql(`
  query MaskedOrder($mask: String!) {
    getOrderByMask(mask: $mask) {
      ...MaskedOrder
    }
  }
`);
