import { useQuery } from "@tanstack/react-query";

import {
  ProductMeasurementsDocument,
  ProductMeasurementsQuery,
  ProductMeasurementsQueryVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCT_MEASUREMENTS_QUERY_KEY = ["product-measurements"];

export const fetchMeasurements = async (sku?: string | null) => {
  const data = await baseMagentoClient("GET").request<
    ProductMeasurementsQuery,
    ProductMeasurementsQueryVariables
  >(ProductMeasurementsDocument, {
    filter: {
      sku: {
        eq: sku,
      },
    },
  });

  return data.products?.items?.[0];
};

export const useProductMeasurementsQuery = (sku?: string | null) => {
  return useQuery({
    queryKey: [...PRODUCT_MEASUREMENTS_QUERY_KEY, sku],
    queryFn: () => fetchMeasurements(sku),
    enabled: !!sku,
    staleTime: 3600,
  });
};
