import { useQuery } from "@tanstack/react-query";

import { ProductSeriesDocument } from "@/queries/product.queries";
import { SeriesQuery, SeriesQueryVariables } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCT_SERIES_QUERY_KEY = ["series"];

export const useProductSeriesQuery = (sku?: string | null) => {
  const fetchSeries = async () => {
    const data = await baseMagentoClient.request<
      SeriesQuery,
      SeriesQueryVariables
    >(ProductSeriesDocument, {
      filter: {
        sku: {
          eq: sku,
        },
      },
    });

    return data.products?.items?.[0]?.series;
  };

  return useQuery({
    queryKey: [...PRODUCT_SERIES_QUERY_KEY, sku],
    queryFn: fetchSeries,
    enabled: !!sku,
    staleTime: 3600,
  });
};
