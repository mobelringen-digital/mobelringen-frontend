import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { ProductsQueryDocument } from "@/queries/product/product.queries";
import {
  InputMaybe,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductsQuery,
  ProductsQueryVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCTS_QUERY_KEY = ["products"];

export const fetchProducts = async (
  filter: InputMaybe<ProductAttributeFilterInput>,
  sort?: InputMaybe<ProductAttributeSortInput>,
) => {
  const data = await baseMagentoClient("GET").request<
    ProductsQuery,
    ProductsQueryVariables
  >(ProductsQueryDocument, {
    filter,
    sort: sort ?? {},
  });

  return data.products;
};

export const useProductsQuery = (
  filter: InputMaybe<ProductAttributeFilterInput>,
  sort?: InputMaybe<ProductAttributeSortInput>,
) => {
  return useQuery({
    queryKey: [
      ...PRODUCTS_QUERY_KEY,
      JSON.stringify(filter),
      JSON.stringify(sort),
    ],
    queryFn: () => fetchProducts(filter, sort),
    enabled: !!filter?.category_id,
    staleTime: 3600,
    placeholderData: keepPreviousData,
  });
};
