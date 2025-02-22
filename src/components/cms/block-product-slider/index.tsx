"use client";

import React from "react";

import { useBestSellingProductsQuery } from "@/components/cms/block-product-slider/hooks/useBestSellingProductsQuery";
import { useProductsQuery } from "@/components/cms/block-product-slider/hooks/useProductsQuery";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { ProductSliderSkeleton } from "@/components/product-slider/ProductSliderSkeleton";
import { CmsProductSliderFragment } from "@/types";

interface Props {
  data: CmsProductSliderFragment;
}

export const CmsProductSlider: React.FC<Props> = ({ data }) => {
  const { categoryId, title } = data;
  const { data: popularProducts, isLoading } =
    useBestSellingProductsQuery(categoryId);
  const { data: productsBySku } = useProductsQuery(
    data.specificProductsSku?.split(","),
  );

  const isDataAvailable =
    (popularProducts && popularProducts.length > 0) ||
    (productsBySku && productsBySku.length > 0);

  if (!isDataAvailable) {
    return null;
  }

  if (isLoading) {
    return (
      <CmsBlockWrapper>
        <ProductSliderSkeleton />
      </CmsBlockWrapper>
    );
  }

  if (popularProducts) {
    return (
      <CmsBlockWrapper config={data.blockConfig}>
        <ProductSlider
          hideTitle={data.blockConfig?.hideBlockTitle ?? false}
          title={title}
          data={popularProducts}
        />
      </CmsBlockWrapper>
    );
  }

  if (productsBySku) {
    return (
      <CmsBlockWrapper config={data.blockConfig}>
        <ProductSlider
          hideTitle={data.blockConfig?.hideBlockTitle ?? false}
          title={title}
          data={productsBySku}
        />
      </CmsBlockWrapper>
    );
  }

  return null;
};
