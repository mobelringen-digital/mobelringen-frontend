import React from "react";

import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { BaseProductSliderDataFragment } from "@/types";

interface Props {
  data?: BaseProductSliderDataFragment | null;
}

export const ProductSeries: React.FC<Props> = ({ data }) => {
  if (!data?.series) return null;

  return <ProductSlider title="Utforsk serien" data={data.series} />;
};
