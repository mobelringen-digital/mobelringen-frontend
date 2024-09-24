import { graphql } from "@/types/schema";

export const GenerateCustomerTokenDocument = graphql(`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`);

export const CustomerWishlistFragment = graphql(`
  fragment CustomerWishlist on Wishlist {
    id
    name
    sharing_code
    items_v2 {
      items {
        id
        product {
          name
          sku
          url_key
          small_image {
            url
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
            }
          }
        }
      }
    }
  }
`);

export const CustomerAddressFragment = graphql(`
  fragment CustomerAddress on CustomerAddress {
    city
    company
    country_code
    vat_id
    telephone
    suffix
    street
    region_id
    prefix
    postcode
    middlename
    lastname
    id
    firstname
    fax
    default_shipping
    default_billing
  }
`);

export const CustomerOrderFragment = graphql(`
  fragment CustomerOrder on CustomerOrder {
    carrier
    count
    currency
    email
    id
    delivery_type
    shipping_method
    total {
      base_grand_total {
        value
        currency
      }
      subtotal {
        value
        currency
      }
      grand_total {
        currency
        value
      }
      total_shipping {
        currency
        value
      }
      total_tax {
        currency
        value
      }
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
    items {
      image
      link
      name
      price
      quantity
      sku
    }
    order_date
    order_number
    status
    number
  }
`);

export const CustomerOrdersDocument = graphql(`
  query CustomerOrders {
    customer {
      orders {
        total_count
        items {
          ...CustomerOrder
        }
      }
    }
  }
`);

export const CustomerDataFragment = graphql(`
  fragment CustomerData on Customer {
    orders {
      total_count
      items {
        ...CustomerOrder
      }
    }
    phone_number
    accepts_analysis
    accepts_data_quality
    accepts_digital_campaigns
    accepts_emails
    accepts_sms
    accepts_social_media
    accepts_terms
    accepts_third_parties
    accepts_transactions
    firstname
    lastname
    is_subscribed
    favorite_store
    wishlists {
      ...CustomerWishlist
    }
    addresses {
      ...CustomerAddress
    }
  }
`);

export const CustomerDocument = graphql(`
  query Customer {
    customer {
      ...CustomerData
    }
  }
`);

export const WishListFragment = graphql(`
  fragment WishListFragment on WishlistOutput {
    items_count
    items {
      added_at
      description
      id
      qty
      product {
        ...BaseProduct
      }
    }
    name
    sharing_code
  }
`);

export const WishlistDocument = graphql(`
  query Wishlist {
    wishlist {
      ...WishListFragment
    }
  }
`);

export const UpdateCustomerDocument = graphql(`
  mutation UpdateCustomer($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        ...CustomerData
      }
    }
  }
`);

export const CreateCustomerV2Document = graphql(`
  mutation CreateCustomerV2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        firstname
        lastname
      }
    }
  }
`);

export const ChangeCustomerPasswordDocument = graphql(`
  mutation ChangeCustomerPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      ...CustomerData
    }
  }
`);
