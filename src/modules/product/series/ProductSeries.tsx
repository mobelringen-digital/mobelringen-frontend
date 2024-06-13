import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { useProductSliderDataQuery } from "@/components/product/hooks/useProductSliderDataQuery";
import { ProductSlider } from "@/components/product-slider/ProductSlider";

interface Props {
  sku?: string | null;
}

export const ProductSeries: React.FC<Props> = ({ sku }) => {
  const { data, isLoading } = useProductSliderDataQuery(sku);

  if (isLoading) {
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );
  }

  if (!data?.series) return null;

  return <ProductSlider title="Utforsk serien" data={data.series} />;
};
