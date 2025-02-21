import { graphql } from "@/types/schema";

export const RouteDocument = graphql(`
  query Route($url: String!) {
    route(url: $url) {
      redirect_code
      relative_url
      type
      ... on SimpleProduct {
        __typename
        id
        name
        sku
      }
      ... on ConfigurableProduct {
        __typename
        id
        name
        sku
      }
    }
  }
`);
