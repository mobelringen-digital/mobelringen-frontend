import { useQuery } from "@tanstack/react-query";

import { ProductSliderDataDocument } from "@/queries/product.queries";
import {
  ProductSliderDataQuery,
  ProductSliderDataQueryVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCT_SLIDER_DATA_QUERY_KEY = ["product-slider"];

export const useProductSliderDataQuery = (sku?: string | null) => {
  const fetchProductSliderData = async () => {
    const data = await baseMagentoClient.request<
      ProductSliderDataQuery,
      ProductSliderDataQueryVariables
    >(ProductSliderDataDocument, {
      filter: {
        sku: {
          eq: sku,
        },
      },
    });

    const item = data.products?.items?.[0];

    if (
      item?.__typename === "SimpleProduct" ||
      item?.__typename === "ConfigurableProduct"
    ) {
      return item;
    }

    return null;
  };

  return useQuery({
    queryKey: [...PRODUCT_SLIDER_DATA_QUERY_KEY, sku],
    queryFn: fetchProductSliderData,
    enabled: !!sku,
    staleTime: 3600,
  });
};
