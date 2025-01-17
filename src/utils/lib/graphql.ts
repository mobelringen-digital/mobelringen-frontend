import { cache } from "react";

import { GraphQLClient } from "graphql-request";

export const HYGRAPH_CACHE_TIME = 300; // 5min cache

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
            revalidate: method === "POST" ? 0 : HYGRAPH_CACHE_TIME, // 5min cache
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
  signal?: AbortSignal,
) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_MAGENTO_URL as string, {
    method,
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          method,
          signal,
          next: {
            cache: method === "POST" ? "no-store" : undefined,
            revalidate: method === "POST" ? 0 : 3600,
            ...nextOptions,
          },
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
    errorPolicy: "all",
    headers: {
      authorization: `Bearer ${token ?? ""}`,
    },
    mode: "cors",
    referrer: process.env.NEXT_PUBLIC_APP_URL,
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          method,
          next: {
            cache: method === "POST" ? "no-store" : undefined,
            revalidate: method === "POST" ? 0 : 3600,
            ...nextOptions,
          },
          ...init,
        }),
    ),
  });
