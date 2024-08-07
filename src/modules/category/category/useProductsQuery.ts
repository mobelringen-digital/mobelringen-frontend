import { useQuery } from "@tanstack/react-query";

import { ProductsQueryDocument } from "@/queries/product/product.queries";
import {
  InputMaybe,
  ProductAttributeFilterInput,
  ProductsQuery,
  ProductsQueryVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCTS_QUERY_KEY = ["products"];

export const fetchProducts = async (
  filter: InputMaybe<ProductAttributeFilterInput>,
) => {
  const data = await baseMagentoClient("GET").request<
    ProductsQuery,
    ProductsQueryVariables
  >(ProductsQueryDocument, {
    filter,
  });

  return data.products;
};

export const useProductsQuery = (
  filter: InputMaybe<ProductAttributeFilterInput>,
) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, JSON.stringify(filter)],
    queryFn: () => fetchProducts(filter),
    enabled: !!filter?.category_id,
    staleTime: 3600,
  });
};
