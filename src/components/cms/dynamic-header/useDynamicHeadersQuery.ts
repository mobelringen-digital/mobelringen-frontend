import React from "react";

import { useQuery } from "@tanstack/react-query";

import { CmsDynamicHeadersDocument } from "@/queries/page.queries";
import {
  CmsDynamicHeadersQuery,
  CmsDynamicHeadersQueryVariables,
} from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

export const DYNAMIC_HEADERS_QUERY_KEY = ["dynamic-headers"];

export const useDynamicHeadersQuery = (url: string) => {
  const urlHierarchy = React.useMemo(() => {
    const parts = url.split("/");
    const result = [url];

    for (let i = parts.length - 1; i > 1; i--) {
      const newUrl = parts.slice(0, i).join("/");
      result.push(newUrl);
    }

    return result;
  }, [url]);

  const fetchDynamicHeaders = async () => {
    const data = await baseHygraphClient.request<
      CmsDynamicHeadersQuery,
      CmsDynamicHeadersQueryVariables
    >(CmsDynamicHeadersDocument, {
      where: {
        rule: {
          value_contains_some: urlHierarchy,
        },
      },
    });

    return data.dynamicHeaders;
  };

  return useQuery({
    queryKey: [...DYNAMIC_HEADERS_QUERY_KEY, urlHierarchy[0]],
    queryFn: fetchDynamicHeaders,
    enabled: !!url,
    staleTime: Infinity,
  });
};
