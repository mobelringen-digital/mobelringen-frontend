import { useQuery } from "@tanstack/react-query";

import { BestSellingProductsByCategory } from "@/queries/product/popular-products.queries";
import {
  BestSellingProductsByCategoryQuery,
  BestSellingProductsByCategoryQueryVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const BEST_SELLING_PRODUCTS_QUERY_KEY = ["best-selling-products"];

export const fetchBestSellingProducts = async (categoryId?: number | null) => {
  const data = await baseMagentoClient("GET").request<
    BestSellingProductsByCategoryQuery,
    BestSellingProductsByCategoryQueryVariables
  >(BestSellingProductsByCategory, {
    categoryId: categoryId ?? 0,
  });

  return data.bestSellingProductsByCategory;
};

export const useBestSellingProductsQuery = (categoryId?: string | null) => {
  return useQuery({
    queryKey: [...BEST_SELLING_PRODUCTS_QUERY_KEY, categoryId],
    queryFn: () => fetchBestSellingProducts(parseInt(categoryId as string)),
    enabled: !!categoryId,
    staleTime: Infinity,
  });
};
