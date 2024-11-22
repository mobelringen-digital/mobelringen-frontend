import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
import { CategoryFilters } from "@/modules/category/category/category-filters/CategoryFilters";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { useFiltersQuery } from "@/modules/category/category/category-filters/useFiltersQuery";
import { ProductsList } from "@/modules/category/category/ProductsList";
import { ProductsListSkeleton } from "@/modules/category/category/ProductsListSkeleton";
import { useProductsQuery } from "@/modules/category/category/useProductsQuery";

interface Props {
  query: string;
}

export const Products: React.FC<Props> = ({ query }) => {
  const { sortValues } = useCategoryFilters();
  const { filterValues } = useFiltersQuery();
  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProductsQuery({
    search: query,
    filter: filterValues,
    sort: sortValues,
  });

  const currentlyLoaded = data?.pages.reduce((acc, page) => {
    return acc + (page?.items?.length ?? 0);
  }, 0);
  const totalCount = data?.pages[0]?.total_count;

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}

      {isLoading || isFetching ? <ProductsListSkeleton /> : null}
      {totalCount && totalCount > 0 ? (
        <>
          <CmsBlockHeader title="Produkter" />
          <CategoryFilters
            totalCount={data?.pages[0]?.total_count}
            filters={data?.pages[0]?.aggregations}
          />

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
                  aria-label="Last inn flere"
                  disabled={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                >
                  Last inn flere
                </Button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
