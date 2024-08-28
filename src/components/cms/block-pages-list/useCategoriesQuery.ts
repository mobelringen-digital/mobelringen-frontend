import { useQuery } from "@tanstack/react-query";

import { CmsPageCategoriesDocument } from "@/queries/page.queries";
import { PageWhereInput } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

export const CMS_CATEGORIES_QUERY_KEY = ["page-categories"];

export const useCategoriesQuery = (where: PageWhereInput) => {
  const fetchCategories = async () => {
    const data = await baseHygraphClient("GET").request(
      CmsPageCategoriesDocument,
      {
        where,
      },
    );

    return data.pageCategories;
  };

  return useQuery({
    queryKey: [...CMS_CATEGORIES_QUERY_KEY, JSON.stringify(where)],
    queryFn: fetchCategories,
    staleTime: 3600,
  });
};
