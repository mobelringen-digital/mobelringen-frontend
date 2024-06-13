import { useQuery } from "@tanstack/react-query";

import { ProductsQueryDocument } from "@/queries/product/product.queries";
import { ProductsQuery, ProductsQueryVariables } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCTS_QUERY_KEY = ["products"];

export const useProductsQuery = (categoryId?: number | null) => {
  const fetchProducts = async () => {
    const data = await baseMagentoClient.request<
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

  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, categoryId],
    queryFn: fetchProducts,
    enabled: !!categoryId,
    staleTime: 3600,
  });
};
