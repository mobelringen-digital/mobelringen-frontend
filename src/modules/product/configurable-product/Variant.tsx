"use client";

import React from "react";

import cx from "classnames";

import Image from "next/image";

import { useProductData } from "@/modules/product/product-data-provider/useProductData";
import { BaseProductFragment } from "@/queries/product.queries";
import {
  ConfigurableProductVariantsFragment,
  ProductImageFragmentFragment,
} from "@/types";
import { useFragment } from "@/types/schema";

interface Props {
  variant?: ConfigurableProductVariantsFragment | null;
}

export const Variant: React.FC<Props> = ({ variant }) => {
  const { setProductData, productData } = useProductData();
  const selectedProduct = useFragment(
    BaseProductFragment,
    productData.variant?.product,
  );

  const variantProduct = useFragment(BaseProductFragment, variant?.product);

  if (!variantProduct) return null;

  const handleVariantSelect = () => {
    if (!variantProduct.sku) return;

    if (!!selectedProduct && selectedProduct?.sku === variantProduct.sku) {
      return setProductData((prev) => ({
        ...prev,
        variant: null,
        attributes: [],
      }));
    }

    setProductData((prev) => ({
      ...prev,
      variant: variant,
    }));
  };

  return (
    <button
      onClick={handleVariantSelect}
      className={cx(
        "w-[64px] h-[64px] bg-warm-grey p-2 flex items-center justify-center rounded-2xl",
        {
          "border-1 border-black": selectedProduct?.sku === variantProduct.sku,
        },
        {
          "border-1 border-warm-grey":
            selectedProduct?.sku !== variantProduct.sku,
        },
      )}
    >
      <Image
        src={(variantProduct.image as ProductImageFragmentFragment)?.url ?? ""}
        alt={variantProduct.sku ?? ""}
        width={48}
        height={48}
      />
    </button>
  );
};
