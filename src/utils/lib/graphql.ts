import { cache } from "react";

import { GraphQLClient } from "graphql-request";

export const baseHygraphClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_URL as string,
  {
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          next: { revalidate: 60 },
          ...init,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_KEY}`,
          },
        }),
    ),
  },
);

export const baseMagentoClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_MAGENTO_URL as string,
);

export const authorizedMagentoClient = (token: string) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_MAGENTO_URL as string, {
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          next: { revalidate: 60 },
          ...init,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/graphql-response+json, application/json",
            ContentType: "application/json",
            "Content-Type": "application/json",
          },
        }),
    ),
  });
