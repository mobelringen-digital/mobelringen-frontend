"use client";

import React from "react";

import cx from "classnames";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useActiveProductData } from "@/modules/product/active-product-data-provider/useActiveProductData";
import { ConfigurableProductVariantsFragment } from "@/types";

interface Props {
  variant?: ConfigurableProductVariantsFragment | null;
}

export const Variant: React.FC<Props> = ({ variant }) => {
  const { activeProductVariant } = useActiveProductData();
  const selectedProduct = activeProductVariant.variant?.product;
  const variantProduct = variant?.product;
  const pathname = usePathname();
  const router = useRouter();

  if (!variantProduct) return null;

  const handleVariantSelect = () => {
    if (!variantProduct.sku) return;

    router.push(`${pathname}?variant=${variant?.product?.sku}`);
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
        className="object-contain w-[45px] h-[45px]"
        src={variantProduct.small_image?.url ?? ""}
        alt={variantProduct.sku ?? ""}
        width={45}
        height={45}
      />
    </button>
  );
};
