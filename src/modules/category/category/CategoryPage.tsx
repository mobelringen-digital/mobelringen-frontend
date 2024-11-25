"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CategoryFilters } from "@/modules/category/category/category-filters/CategoryFilters";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { useFiltersQuery } from "@/modules/category/category/category-filters/useFiltersQuery";
import { ProductsList } from "@/modules/category/category/ProductsList";
import { ProductsListSkeleton } from "@/modules/category/category/ProductsListSkeleton";
import { useProductsQuery } from "@/modules/category/category/useProductsQuery";
import { CategoryItemEntity } from "@/modules/category/types";
import {
  BaseProductDataForCardFragment,
  BaseProductFragment,
  ProductsQuery,
} from "@/types";
import { formatGTMCategories } from "@/utils/gtm";

interface Props {
  category: CategoryItemEntity;
}

const clickOnItemGTMEvent = (product: BaseProductDataForCardFragment) => {
  if (!product) {
    return;
  }

  return sendGTMEvent({
    event: "select_item",
    items: [
      {
        item_id: product.sku,
        item_name: product.name,
        addable_to_cart: product.addable_to_cart,
        item_brand: product.productBrand?.name,
        price: product.price_range.maximum_price?.final_price.value,
        discount: product.price_range.maximum_price?.discount?.amount_off,
        ...formatGTMCategories(
          product.categories?.map((cat) => ({
            name: cat?.name,
          })),
        ),
      },
    ],
  });
};

const viewItemListGTMEvent = (
  category: CategoryItemEntity,
  products?: ProductsQuery["products"],
) => {
  return sendGTMEvent({
    event: "view_item_list",
    item_list_name: category?.name,
    items: products?.items?.map((product) => ({
      item_id: (product as BaseProductFragment).sku,
      addable_to_cart: (product as BaseProductFragment).addable_to_cart,
      item_name: (product as BaseProductFragment).name,
      item_brand: (product as BaseProductFragment).productBrand?.name,
      price: (product as BaseProductFragment).price_range.maximum_price
        ?.final_price.value,
      discount: (product as BaseProductFragment).price_range.maximum_price
        ?.discount?.amount_off,
      ...formatGTMCategories(
        (product as BaseProductFragment).categories?.map((cat) => ({
          name: cat?.name,
        })),
      ),
    })),
  });
};

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const { sortValues } = useCategoryFilters();
  const { filterValues } = useFiltersQuery();

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProductsQuery({
      filter: {
        category_id: {
          eq: String(category?.id),
        },
        ...filterValues,
      },
      sort: sortValues,
    });

  const loadMore = () => {
    fetchNextPage().then(() => {
      viewItemListGTMEvent(category, data?.pages[data?.pages.length - 1]);
    });
  };

  const currentlyLoaded = data?.pages.reduce((acc, page) => {
    return acc + (page?.items?.length ?? 0);
  }, 0);
  const totalCount = data?.pages[0]?.total_count;

  React.useEffect(() => {
    viewItemListGTMEvent(category, data?.pages[0]);
  }, [category, data]);

  return (
    <ContainerLayout className="mt-12">
      {isLoading ? <PageTopLoader /> : null}
      <CategoryFilters
        totalCount={data?.pages[0]?.total_count}
        filters={data?.pages[0]?.aggregations}
      />
      {isLoading ? <ProductsListSkeleton /> : null}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
        {data?.pages.map((page, idx) => {
          return (
            <ProductsList
              onItemClick={clickOnItemGTMEvent}
              key={idx}
              products={page}
            />
          );
        })}
      </div>

      <div className="flex w-full items-center justify-center mt-8 pt-8 border-t border-cold-grey-dark">
        <div className="flex flex-col gap-3">
          <span className="text-black text-base">
            Viser {currentlyLoaded} av {totalCount} produkter
          </span>
          {hasNextPage ? (
            <Button disabled={isFetchingNextPage} onClick={loadMore}>
              Last inn flere
            </Button>
          ) : null}
        </div>
      </div>
    </ContainerLayout>
  );
};
