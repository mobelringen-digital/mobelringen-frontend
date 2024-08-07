import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { notFound } from "next/navigation";

import { CategoryPage } from "@/modules/category/category/CategoryPage";
import {
  fetchProducts,
  PRODUCTS_QUERY_KEY,
} from "@/modules/category/category/useProductsQuery";
import { CategoryDescription } from "@/modules/category/CategoryDescription";
import { ParentCategoryPage } from "@/modules/category/parent-category/ParentCategoryPage";
import { SubCategoriesSelect } from "@/modules/category/SubCategoriesSelect";
import { CategoryQueryDocument } from "@/queries/category.queries";
import {
  BaseCategoryDataFragment,
  CategoryQuery,
  CategoryQueryVariables,
} from "@/types";
import { generatePrettyUrl } from "@/utils/helpers";
import { baseMagentoClient } from "@/utils/lib/graphql";

type Props = {
  url: string;
};

async function getCategory(url: string) {
  return await baseMagentoClient("GET").request<
    CategoryQuery,
    CategoryQueryVariables
  >(CategoryQueryDocument, {
    filters: { url_path: { eq: url } },
  });
}

const isLastCategoryInTree = (category: BaseCategoryDataFragment) => {
  return !!(category?.children && category.children.length === 0);
};

const isLastCategoryWithChildren = (category: BaseCategoryDataFragment) => {
  return category?.children?.every((cat) => cat && isLastCategoryInTree(cat));
};

async function getLastCategoryWithChildren(
  currentUrl: string,
  category: CategoryQuery,
) {
  const currentCategory = category.categories?.items?.[0];

  const getParentCategoryUrl = () => {
    const parentUrlData = currentUrl.split("/");
    parentUrlData.splice(-1);

    return generatePrettyUrl(parentUrlData, {
      removeTrailSlash: true,
    });
  };

  if (currentCategory && isLastCategoryInTree(currentCategory)) {
    return await getCategory(getParentCategoryUrl());
  }

  return category;
}

export default async function Category({ url }: Props) {
  const category = await getCategory(url);
  const currentCategory = category.categories?.items?.[0];
  const queryClient = new QueryClient();

  if (currentCategory && isLastCategoryWithChildren(currentCategory)) {
    await queryClient.prefetchQuery({
      queryKey: [...PRODUCTS_QUERY_KEY, currentCategory.id],
      queryFn: () =>
        fetchProducts({ category_id: { eq: String(currentCategory?.id) } }),
    });
  }

  /**
   * Parent category is only fetched when last category is reached
   * So subcategory select displays all categories from parent
   * Only used to display subcategories list
   * When user is on last level category, parent subcategories are displayed for easier navigation
   */
  const lastCategoryWithChildren = await getLastCategoryWithChildren(
    url,
    category,
  );
  const subCategoriesData = lastCategoryWithChildren.categories?.items?.[0];

  if (!currentCategory) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <title>{currentCategory.meta_title ?? currentCategory.name}</title>
      <meta
        name="description"
        content={currentCategory.meta_description ?? ""}
      />

      {subCategoriesData ? (
        <SubCategoriesSelect category={subCategoriesData} url={url} />
      ) : null}

      {isLastCategoryWithChildren(currentCategory) ? (
        <CategoryPage category={currentCategory} />
      ) : (
        <ParentCategoryPage />
      )}

      {currentCategory?.description ? (
        <CategoryDescription
          name={currentCategory.name ?? ""}
          description={currentCategory.description}
        />
      ) : null}
    </HydrationBoundary>
  );
}
