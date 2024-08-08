"use client";

import React from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CategoryFilters } from "@/modules/category/category/category-filters/CategoryFilters";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { ProductsList } from "@/modules/category/category/ProductsList";
import { ProductsListSkeleton } from "@/modules/category/category/ProductsListSkeleton";
import { useProductsQuery } from "@/modules/category/category/useProductsQuery";
import { CategoryItemEntity } from "@/modules/category/types";

interface Props {
  category: CategoryItemEntity;
}

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const { filterValues, sortValues } = useCategoryFilters();
  const { data, isLoading } = useProductsQuery(
    {
      category_id: {
        eq: String(category?.id),
      },
      ...filterValues,
    },
    {
      ...sortValues,
    },
  );

  return (
    <ContainerLayout>
      {isLoading ? <PageTopLoader /> : null}
      <CategoryFilters
        totalCount={data?.total_count}
        filters={data?.aggregations}
      />
      {isLoading ? <ProductsListSkeleton /> : <ProductsList products={data} />}
    </ContainerLayout>
  );
};
