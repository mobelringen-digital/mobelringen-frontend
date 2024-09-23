import { useQuery } from "@tanstack/react-query";

import { CmsDynamicHeadersDocument } from "@/queries/page.queries";
import {
  CmsDynamicHeadersQuery,
  CmsDynamicHeadersQueryVariables,
} from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

export const DYNAMIC_HEADERS_QUERY_KEY = ["dynamic-headers"];

export const useDynamicHeadersQuery = (url: string) => {
  const fetchDynamicHeaders = async () => {
    const data = await baseHygraphClient("GET").request<
      CmsDynamicHeadersQuery,
      CmsDynamicHeadersQueryVariables
    >(CmsDynamicHeadersDocument, {
      where: {
        rule: {
          value_contains_some: [url],
        },
      },
    });

    return data.dynamicHeaders;
  };

  return useQuery({
    queryKey: [...DYNAMIC_HEADERS_QUERY_KEY, url],
    queryFn: fetchDynamicHeaders,
    enabled: !!url,
    staleTime: Infinity,
  });
};
