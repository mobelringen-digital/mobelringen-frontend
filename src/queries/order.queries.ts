import { graphql } from "@/types/schema";

export const MaskedOrderFragment = graphql(`
  fragment MaskedOrder on CustomerOrder {
    applied_coupons {
      code
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
    count
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
