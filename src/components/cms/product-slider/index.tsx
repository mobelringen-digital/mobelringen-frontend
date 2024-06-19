"use client";

import React from "react";

import { useBestSellingProductsQuery } from "@/components/cms/product-slider/hooks/useBestSellingProductsQuery";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { CmsProductSliderFragment } from "@/types";

interface Props {
  data: CmsProductSliderFragment;
}

export const CmsProductSlider: React.FC<Props> = ({ data }) => {
  const { categoryId, title } = data;
  const { data: popularProducts, isLoading } =
    useBestSellingProductsQuery(categoryId);

  if (popularProducts && popularProducts.length > 0) {
    return (
      <ContainerLayout>
        <ProductSlider
          isLoading={isLoading}
          title={title}
          data={popularProducts}
        />
      </ContainerLayout>
    );
  }

  return null;
};
