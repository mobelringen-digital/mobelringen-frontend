"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import { useActiveProductData } from "@/modules/product/active-product-data-provider/useActiveProductData";
import { Variant } from "@/modules/product/configurable-product/Variant";
import { ConfigurableProductVariantsFragment } from "@/types";

interface Props {
  variants?: Array<ConfigurableProductVariantsFragment | null> | null;
}

export const Variants: React.FC<Props> = ({ variants }) => {
  const searchParams = useSearchParams();

  const { activeProductVariant, setActiveProductVariant } =
    useActiveProductData();

  React.useEffect(() => {
    const variantSku = searchParams.get("variant");

    if (
      variantSku &&
      variantSku !== activeProductVariant.variant?.product?.sku
    ) {
      const variantToSet = variants?.find(
        (v) => v?.product?.sku === variantSku,
      );

      if (variantToSet) {
        setActiveProductVariant((prev) => ({
          ...prev,
          variant: variantToSet,
        }));
      }
    }
  }, [activeProductVariant, searchParams, setActiveProductVariant, variants]);

  return (
    <div className="flex flex-wrap gap-4 justify-between lg:justify-start">
      {variants?.map((variant, idx) => <Variant variant={variant} key={idx} />)}
    </div>
  );
};
