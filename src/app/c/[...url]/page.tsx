import React from "react";

import { Metadata } from "next";

import { notFound } from "next/navigation";

import { CategoryPage } from "@/modules/category/category/CategoryPage";
import { CategoryDescription } from "@/modules/category/CategoryDescription";
import { ParentCategoryPage } from "@/modules/category/parent-category/ParentCategoryPage";
import { SubCategoriesSelect } from "@/modules/category/SubCategoriesSelect";
import { CategoryItemEntity } from "@/modules/category/types";
import { CategoryQueryDocument } from "@/queries/category.queries";
import { CategoryQuery, CategoryQueryVariables } from "@/types";
import { generatePrettyUrl } from "@/utils/helpers";
import { baseMagentoClient } from "@/utils/lib/graphql";


type Props = {
  params: { url: Array<string> };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getCategory(url: string) {
  return await baseMagentoClient.request<CategoryQuery, CategoryQueryVariables>(
    CategoryQueryDocument,
    {
      filters: { url_path: { eq: url } },
    },
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const url = generatePrettyUrl(params.url, {
    removeTrailSlash: true,
  });

  const data = await getCategory(url);

  if (data.categories?.items && data.categories.items.length === 0) {
    return notFound();
  }

  return {
    title: data.categories?.items?.[0]?.meta_title,
    description: data.categories?.items?.[0]?.meta_description,
  };
}

const isLastCategoryInTree = (category: CategoryItemEntity) => {
  return !!(category?.children && category.children.length === 0);
};

const isLastCategoryWithChildren = (category: CategoryItemEntity) => {
  return category?.children?.every((cat) => isLastCategoryInTree(cat));
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

export default async function Category({ params }: Props) {
  const url = generatePrettyUrl(params.url, {
    removeTrailSlash: true,
  });
  const category = await getCategory(url);
  const currentCategory = category.categories?.items?.[0];

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
    <>
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
    </>
  );
}
