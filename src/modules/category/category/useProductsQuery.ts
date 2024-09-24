import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

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

export const fetchProducts = async ({
  filter = {},
  sort = {},
  currentPage = 1,
  search = "",
}: {
  filter: InputMaybe<ProductAttributeFilterInput>;
  sort?: InputMaybe<ProductAttributeSortInput>;
  currentPage?: number;
  search?: string;
}) => {
  const data = await baseMagentoClient("GET").request<
    ProductsQuery,
    ProductsQueryVariables
  >(ProductsQueryDocument, {
    filter,
    search,
    sort,
    currentPage,
  });

  return data.products;
};

export const useProductsQuery = ({
  filter = {},
  sort = {},
  search = "",
}: {
  filter?: InputMaybe<ProductAttributeFilterInput>;
  sort?: InputMaybe<ProductAttributeSortInput>;
  search?: string;
}) => {
  return useInfiniteQuery<ProductsQuery["products"]>({
    queryKey: [
      ...PRODUCTS_QUERY_KEY,
      JSON.stringify(filter),
      JSON.stringify(sort),
      search,
    ],
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      (lastPage?.page_info?.current_page ?? 1) <
      (lastPage?.page_info?.total_pages ?? 1)
        ? (lastPage?.page_info?.current_page ?? 1) + 1
        : undefined,
    queryFn: ({ pageParam }) =>
      fetchProducts({ filter, sort, currentPage: pageParam as number, search }),
    enabled: !!filter?.category_id || !!search,
    staleTime: 3600,
    placeholderData: keepPreviousData,
  });
};
