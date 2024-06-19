import { cache } from "react";

import { GraphQLClient } from "graphql-request";

export const baseHygraphClient = (method?: "POST" | "GET") =>
  new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL as string, {
    method: method ?? "POST",
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
  });

export const baseMagentoClient = (method?: "POST" | "GET") =>
  new GraphQLClient(process.env.NEXT_PUBLIC_MAGENTO_URL as string, {
    method: method ?? "POST",
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          next: { revalidate: 3600 },
          ...init,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_KEY}`,
          },
        }),
    ),
  });

export const authorizedMagentoClient = (
  token: string,
  method?: "GET" | "POST",
) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_MAGENTO_URL as string, {
    method: method ?? "POST",
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          next: { revalidate: 3600 },
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
