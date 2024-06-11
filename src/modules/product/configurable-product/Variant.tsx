"use client";

import React from "react";

import cx from "classnames";

import Image from "next/image";

import { useProductData } from "@/modules/product/product-data-provider/useProductData";
import { ConfigurableProductVariantsFragment } from "@/types";

interface Props {
  variant?: ConfigurableProductVariantsFragment | null;
}

export const Variant: React.FC<Props> = ({ variant }) => {
  const { setProductData, productData } = useProductData();
  if (!variant?.product) return null;

  const handleVariantSelect = () => {
    if (!variant?.product?.sku) return;

    if (!!productData && productData.variant === variant.product.sku) {
      return setProductData((prev) => ({ ...prev, variant: null }));
    }

    setProductData((prev) => ({
      ...prev,
      variant: variant?.product?.sku as string,
    }));
  };

  return (
    <button
      onClick={handleVariantSelect}
      className={cx(
        "w-[64px] h-[64px] bg-warm-grey p-2 flex items-center justify-center rounded-2xl",
        {
          "border-1 border-black": variant.product.sku === productData.variant,
        },
        {
          "border-1 border-warm-grey":
            variant.product.sku !== productData.variant,
        },
      )}
    >
      <Image
        src={variant.product.image?.url ?? ""}
        alt={variant.product.sku ?? ""}
        width={48}
        height={48}
      />
    </button>
  );
};
