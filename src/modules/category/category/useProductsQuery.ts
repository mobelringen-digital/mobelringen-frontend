import { useQuery } from "@tanstack/react-query";

import { ProductsQueryDocument } from "@/queries/product/product.queries";
import { ProductsQuery, ProductsQueryVariables } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCTS_QUERY_KEY = ["products"];

export const fetchProducts = async (categoryId?: number | null) => {
  const data = await baseMagentoClient("GET").request<
    ProductsQuery,
    ProductsQueryVariables
  >(ProductsQueryDocument, {
    filter: {
      category_id: {
        eq: String(categoryId),
      },
    },
  });

  return data.products?.items;
};

export const useProductsQuery = (categoryId?: number | null) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, categoryId],
    queryFn: () => fetchProducts(categoryId),
    enabled: !!categoryId,
    staleTime: 3600,
  });
};
