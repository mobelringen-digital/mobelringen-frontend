"use client";

import React from "react";

import { useBestSellingProductsQuery } from "@/components/cms/product-slider/hooks/useBestSellingProductsQuery";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
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
      <ContainerLayout>
        <ProductSliderSkeleton />
      </ContainerLayout>
    );
  }

  if (popularProducts && popularProducts.length > 0) {
    return (
      <ContainerLayout>
        <ProductSlider title={title} data={popularProducts} />
      </ContainerLayout>
    );
  }

  return null;
};
