import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { notFound } from "next/navigation";

import { fetchCustomer } from "@/modules/account/services/fetchCustomer";
import { getToken } from "@/modules/auth/actions";
import { CategoryPage } from "@/modules/category/category/CategoryPage";
import { CategoryDescription } from "@/modules/category/CategoryDescription";
import { ParentCategoryPage } from "@/modules/category/parent-category/ParentCategoryPage";
import { SubCategoriesSelect } from "@/modules/category/SubCategoriesSelect";
import { BaseCategoryDataFragment, CategoryQuery } from "@/types";
import { generatePrettyUrl } from "@/utils/helpers";

import { getCategory } from "./actions";

type Props = {
  url: string;
};

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
  const token = await getToken();

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

  const queryClient = new QueryClient();

  if (token) {
    await queryClient.prefetchQuery({
      queryKey: ["customer", token],
      queryFn: () => fetchCustomer(token),
    });
  }

  return (
    <>
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_APP_URL}/${currentCategory.url_path}`}
      />
      {subCategoriesData ? (
        <SubCategoriesSelect category={subCategoriesData} url={url} />
      ) : null}

      {isLastCategoryWithChildren(currentCategory) ? (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CategoryPage category={currentCategory} />
        </HydrationBoundary>
      ) : (
        <ParentCategoryPage url={url} />
      )}

      {currentCategory?.description ? (
        <CategoryDescription
          name={currentCategory.name ?? ""}
          description={currentCategory.description}
        />
      ) : null}
    </>
  );
}
