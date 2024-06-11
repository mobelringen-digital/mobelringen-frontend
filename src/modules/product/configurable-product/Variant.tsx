import React from "react";

import cx from "classnames";

import Image from "next/image";

import { ConfigurableProductVariantsFragment } from "@/types";

interface Props {
  variant?: ConfigurableProductVariantsFragment | null;
  selectedVariant: string | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Variant: React.FC<Props> = ({
  variant,
  selectedVariant,
  setSelectedVariant,
}) => {
  if (!variant?.product) return null;

  const handleVariantSelect = () => {
    if (!variant?.product?.sku) return;

    if (!!selectedVariant && selectedVariant === variant.product.sku) {
      return setSelectedVariant(null);
    }

    setSelectedVariant(variant.product.sku);
  };

  return (
    <button
      onClick={handleVariantSelect}
      className={cx(
        "w-[64px] h-[64px] bg-warm-grey p-2 flex items-center justify-center rounded-2xl",
        { "border-1 border-black": variant.product.sku === selectedVariant },
        {
          "border-1 border-warm-grey": variant.product.sku !== selectedVariant,
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
