import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { useProductSliderDataQuery } from "@/components/product/hooks/useProductSliderDataQuery";
import { ProductSlider } from "@/components/product-slider/ProductSlider";

interface Props {
  sku?: string | null;
}

export const RelatedProducts: React.FC<Props> = ({ sku }) => {
  const { data, isLoading } = useProductSliderDataQuery(sku);

  if (isLoading) {
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );
  }

  if (!data?.related_products) return null;

  return (
    <ProductSlider title="Relaterte produkter" data={data.related_products} />
  );
};
