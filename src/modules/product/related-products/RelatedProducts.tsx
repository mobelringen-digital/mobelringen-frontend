import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { useRelatedProductsQuery } from "@/modules/product/related-products/useRelatedProductsQuery";

interface Props {
  sku?: string | null;
}

export const RelatedProducts: React.FC<Props> = ({ sku }) => {
  const { data, isLoading } = useRelatedProductsQuery(sku);

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
      title="Relaterte produkter"
      // @ts-expect-error @TODO: Fix typings
      data={data}
    />
  );
};
