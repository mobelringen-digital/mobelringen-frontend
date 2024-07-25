import { cache } from "react";

import { GraphQLClient, ResponseMiddleware } from "graphql-request";

export const baseHygraphClient = (method?: "POST" | "GET") =>
  new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL as string, {
    method,
    fetch: cache(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) =>
        fetch(input, {
          method,
          next: { revalidate: 60 },
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
          ...init,
        }),
    ),
  });

const responseMiddleware: ResponseMiddleware = async (response) => {
  if (!(response instanceof Error) && response.errors) {
    const isGraphQlAuthorizationError = response.errors.find(
      (err) =>
        !!err?.extensions?.category &&
        err.extensions.category === "graphql-authorization",
    );

    if (isGraphQlAuthorizationError) {
      // navigate("/login");
    }
  }
};

export const authorizedMagentoClient = (
  token?: string,
  method?: "GET" | "POST",
  nextOptions?: { revalidate?: number; tags?: string[]; cache?: RequestCache },
) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_MAGENTO_URL as string, {
    method,
    errorPolicy: "all",
    responseMiddleware,
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
          headers: {
            ...(token ? { Authorization: `Bearer ${token ?? ""}` } : undefined),
            Accept:
              "application/graphql-response+json, application/json, multipart/mixed",
            ContentType: "application/json",
            "Content-Type": "application/json",
          },
        }),
    ),
  });
