"use client";

import React from "react";

import { Button } from "@/components/_ui/button/Button";
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
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProductsQuery(
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

  const currentlyLoaded = data?.pages.reduce((acc, page) => {
    return acc + (page?.items?.length ?? 0);
  }, 0);
  const totalCount = data?.pages[0]?.total_count;

  return (
    <ContainerLayout>
      {isLoading ? <PageTopLoader /> : null}
      <CategoryFilters
        totalCount={data?.pages[0]?.total_count}
        filters={data?.pages[0]?.aggregations}
      />
      {isLoading ? <ProductsListSkeleton /> : null}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
        {data?.pages.map((page, idx) => {
          return <ProductsList key={idx} products={page} />;
        })}
      </div>

      <div className="flex w-full items-center justify-center mt-8 pt-8 border-t border-cold-grey-dark">
        <div className="flex flex-col gap-3">
          <span className="text-black text-base">
            Viser {currentlyLoaded} av {totalCount} produkter
          </span>
          {hasNextPage ? (
            <Button
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              Last inn flere
            </Button>
          ) : null}
        </div>
      </div>
    </ContainerLayout>
  );
};
