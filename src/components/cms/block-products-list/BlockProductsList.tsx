"use client";

import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
import { CategoryFilters } from "@/modules/category/category/category-filters/CategoryFilters";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { ProductsList } from "@/modules/category/category/ProductsList";
import { ProductsListSkeleton } from "@/modules/category/category/ProductsListSkeleton";
import { useProductsQuery } from "@/modules/category/category/useProductsQuery";
import { CmsBlockProductsListFragment } from "@/types";

interface Props {
  data: CmsBlockProductsListFragment;
}

export const BlockProductsList: React.FC<Props> = ({ data }) => {
  const { filterValues, sortValues } = useCategoryFilters();
  const categories = data.categoryId?.split(",");
  const skus = data.sku?.split(",");
  const brands = data.brand?.split(",");

  const {
    data: products,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProductsQuery({
    filter: {
      category_id: {
        in: categories,
      },
      sku: {
        in: skus,
      },
      brand: {
        in: brands,
      },
      ...filterValues,
    },
    sort: sortValues,
  });

  const currentlyLoaded = products?.pages.reduce((acc, page) => {
    return acc + (page?.items?.length ?? 0);
  }, 0);
  const totalCount = products?.pages[0]?.total_count;

  if (!products || !products.pages) {
    return null;
  }

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <CmsBlockHeader
        title={data.title}
        hide={data.blockConfig?.hideBlockTitle ?? false}
      />
      {isLoading || isFetching ? <PageTopLoader /> : null}
      <CategoryFilters
        totalCount={products?.pages[0]?.total_count}
        filters={products?.pages[0]?.aggregations}
      />
      {isLoading ? <ProductsListSkeleton /> : null}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
        {products?.pages.map((page, idx) => {
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
    </CmsBlockWrapper>
  );
};
