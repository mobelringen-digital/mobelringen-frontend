import React from "react";

import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { BaseProductSliderDataFragment } from "@/types";

interface Props {
  data?: BaseProductSliderDataFragment | null;
}

export const RelatedProducts: React.FC<Props> = ({ data }) => {
  if (!data?.related_products) return null;

  return (
    <ProductSlider title="Relaterte produkter" data={data.related_products} />
  );
};
