import React from "react";

import Image from "next/image";

import { FixedLowPriceIcon } from "@/components/_ui/icons/figma/FixedLowPriceIcon";
import { ZoomIcon } from "@/components/_ui/icons/ZoomIcon";
import { Label } from "@/components/_ui/label/Label";
import { AddToWishList } from "@/components/product/add-to-wishlist/AddToWishList";
import { BaseProductFragment, ProductImageFragmentFragment } from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  defaultImage?: ProductImageFragmentFragment;
  product?: BaseProductFragment;
  onZoomClick?: () => void;
  enableZoom?: boolean;
}

export const ProductImage: React.FC<Props> = ({
  onZoomClick,
  defaultImage,
  product,
}) => {
  const labels = product?.productLabel;
  const priceRange = product?.price_range;
  const image = defaultImage ?? product?.image;

  const { percentageDiscount } = usePriceRange(priceRange);
  if (!image?.url) return null;

  return (
    <div className="relative p-10 h-[380px] lg:h-[800px] bg-warm-grey rounded-3xl !flex justify-center items-center">
      <Image
        className="object-contain h-[340px] lg:h-[720px]"
        width={650}
        height={650}
        src={image.url}
        alt={image.label ?? ""}
      />

      <div className="absolute top-4 right-4 flex flex-col gap-1 items-end justify-center text-center">
        {percentageDiscount ? (
          <Label variant="powder">{percentageDiscount}</Label>
        ) : null}

        {labels?.custom ? (
          <>
            {labels.custom.map((label, idx) => (
              <Label variant="black" key={idx}>
                {label}
              </Label>
            ))}
          </>
        ) : null}
      </div>

      {product?.low_price ? (
        <div className="absolute top-6 left-6 flex flex-col gap-1 items-center justify-center text-center">
          <FixedLowPriceIcon />
        </div>
      ) : null}

      <div className="absolute bottom-4 right-4 flex gap-3">
        {product ? (
          <div className="bg-white flex items-center justify-center text-center rounded-full">
            <AddToWishList productSku={product.sku} className="!p-2" />
          </div>
        ) : null}

        {typeof onZoomClick === "function" ? (
          <button
            aria-labelledby="Zoom"
            onClick={onZoomClick}
            className="p-2 bg-white flex items-center justify-center text-center rounded-full"
          >
            <ZoomIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
};
