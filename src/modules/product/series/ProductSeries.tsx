import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { useProductSeriesQuery } from "@/modules/product/series/useProductSeriesQuery";

interface Props {
  sku?: string | null;
}

export const ProductSeries: React.FC<Props> = ({ sku }) => {
  const { data, isLoading } = useProductSeriesQuery(sku);

  if (isLoading) {
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );
  }

  if (!data?.length) return null;

  return (
    <ProductSlider
      title="Utforsk serien"
      // @ts-expect-error @TODO: fix typings
      data={data}
    />
  );
};
