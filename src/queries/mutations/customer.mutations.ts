import { graphql } from "@/types/schema";

export const GenerateCustomerTokenDocument = graphql(`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`);

export const CustomerDataFragment = graphql(`
  fragment CustomerData on Customer {
    orders {
      total_count
    }
    firstname
    lastname
    is_subscribed
    addresses {
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
  }
`);

export const CustomerDocument = graphql(`
  query Customer {
    customer {
      ...CustomerData
    }
  }
`);
