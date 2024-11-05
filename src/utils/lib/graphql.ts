import { cache } from "react";

import { GraphQLClient } from "graphql-request";

export const baseHygraphClient = (
  method?: "POST" | "GET",
  nextOptions?: { revalidate?: number; tags?: string[]; cache?: string },
) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL as string, {
    method,
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          method,
          next: {
            cache: method === "POST" ? "no-store" : undefined,
            revalidate: method === "POST" ? 0 : 300, // 5min cache
            ...nextOptions,
          },
          ...init,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_KEY}`,
          },
        }),
    ),
  });

export const baseMagentoClient = (
  method?: "POST" | "GET",
  nextOptions?: { revalidate?: number; tags?: string[]; cache?: string },
) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_MAGENTO_URL as string, {
    method,
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          method,
          next: {
            cache: method === "POST" ? "no-store" : undefined,
            revalidate: method === "POST" ? 0 : 3600,
            ...nextOptions,
          },
          credentials: "include",
          ...init,
        }),
    ),
  });

export const authorizedMagentoClient = (
  token?: string,
  method?: "GET" | "POST",
  nextOptions?: {
    revalidate?: number;
    tags?: string[];
    cache?: RequestCache;
  },
) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_MAGENTO_URL as string, {
    method,
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          method,
          next: {
            revalidate: method === "POST" ? 0 : 3600,
            ...nextOptions,
          },
          cache: nextOptions?.cache,
          ...init,
          credentials: "include",
          headers: {
            ...(token ? { Authorization: `Bearer ${token ?? ""}` } : {}),
            Accept:
              "application/graphql-response+json, application/json, multipart/mixed",
            ContentType: "application/json",
            "Content-Type": "application/json",
          },
        }),
    ),
  });
