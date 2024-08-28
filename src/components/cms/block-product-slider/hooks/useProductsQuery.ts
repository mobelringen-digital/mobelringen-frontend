import { useQuery } from "@tanstack/react-query";

import { SpecificProductsBySku } from "@/queries/product/popular-products.queries";
import {
  SpecificProductsBySkuQuery,
  SpecificProductsBySkuQueryVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCTS_QUERY_KEY = ["products"];

export const useProductsQuery = (productIds?: Array<string>) => {
  const fetchProducts = async () => {
    const data = await baseMagentoClient("GET").request<
      SpecificProductsBySkuQuery,
      SpecificProductsBySkuQueryVariables
    >(SpecificProductsBySku, {
      skus: productIds ?? [],
    });

    return data.products?.items;
  };

  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, productIds?.join(",")],
    queryFn: () => fetchProducts(),
    enabled: !!productIds?.length,
    staleTime: Infinity,
  });
};
