import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import {
  CmsPagesConnectionDocument,
  CmsPagesConnectionQuery,
  PageWhereInput,
} from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

export const CMS_PAGES_QUERY_KEY = ["cms-pages"];

const ARTICLES_PER_PAGE = 12;

export const fetchPages = async (where: PageWhereInput, pageNumber: number) => {
  const data = await baseHygraphClient("GET").request(
    CmsPagesConnectionDocument,
    {
      where,
      first: ARTICLES_PER_PAGE,
      skip: (pageNumber - 1) * ARTICLES_PER_PAGE,
    },
  );

  return data.pagesConnection;
};

export const useCmsPagesQuery = (where: PageWhereInput) => {
  return useInfiniteQuery<CmsPagesConnectionQuery["pagesConnection"]>({
    queryKey: [...CMS_PAGES_QUERY_KEY, JSON.stringify(where)],
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.pageInfo.hasNextPage ? (lastPageParam as number) + 1 : undefined,
    queryFn: ({ pageParam }) => fetchPages(where, pageParam as number),
    staleTime: 3600,
    placeholderData: keepPreviousData,
  });
};
