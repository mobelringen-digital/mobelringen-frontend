import React from "react";

import { notFound } from "next/navigation";

import { CmsDynamicHeader } from "@/components/cms/dynamic-header/CmsDynamicHeader";
import { CategoryPage } from "@/modules/category/category/CategoryPage";
import { CategoryDescription } from "@/modules/category/CategoryDescription";
import { ParentCategoryPage } from "@/modules/category/parent-category/ParentCategoryPage";
import { SubCategoriesSelect } from "@/modules/category/SubCategoriesSelect";
import { CategoryItemEntity } from "@/modules/category/types";
import { CategoryQueryDocument } from "@/queries/category.queries";
import { CmsStaticPageConfigurationDocument } from "@/queries/page.queries";
import {
  CategoryQuery,
  CategoryQueryVariables,
  CmsStaticPageConfigurationQuery,
  CmsStaticPageConfigurationQueryVariables,
  StaticPageType,
} from "@/types";
import { generatePrettyUrl } from "@/utils/helpers";
import { baseHygraphClient, baseMagentoClient } from "@/utils/lib/graphql";

type Props = {
  url: string;
};

async function getCategory(url: string) {
  return await baseMagentoClient.request<CategoryQuery, CategoryQueryVariables>(
    CategoryQueryDocument,
    {
      filters: { url_path: { eq: url } },
    },
  );
}
async function getStaticPageConfiguration() {
  return await baseHygraphClient.request<
    CmsStaticPageConfigurationQuery,
    CmsStaticPageConfigurationQueryVariables
  >(CmsStaticPageConfigurationDocument, {
    where: {
      pageType: StaticPageType.CategoryPage,
    },
  });
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

export default async function Category({ url }: Props) {
  const category = await getCategory(url);
  const configuration = await getStaticPageConfiguration();
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
      <title>{currentCategory.meta_title ?? currentCategory.name}</title>
      <meta
        name="description"
        content={currentCategory.meta_description ?? ""}
      />

      {configuration.staticPageConfiguration?.dynamicHeader ? (
        <CmsDynamicHeader
          data={configuration.staticPageConfiguration.dynamicHeader}
        />
      ) : null}

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
