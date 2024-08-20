"use client";

import React from "react";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { useBestSellingProductsQuery } from "@/components/cms/product-slider/hooks/useBestSellingProductsQuery";
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

  if (isLoading) {
    return (
      <CmsBlockWrapper>
        <ProductSliderSkeleton />
      </CmsBlockWrapper>
    );
  }

  if (popularProducts && popularProducts.length > 0) {
    return (
      <CmsBlockWrapper config={data.blockConfig}>
        <ProductSlider title={title} data={popularProducts} />
      </CmsBlockWrapper>
    );
  }

  return null;
};
