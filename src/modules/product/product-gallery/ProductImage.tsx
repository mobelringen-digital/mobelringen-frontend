import React from "react";

import Image from "next/image";

import { FavoriteIcon } from "@/components/_ui/icons/FavoriteIcon";
import { ZoomIcon } from "@/components/_ui/icons/ZoomIcon";
import { Label } from "@/components/_ui/label/Label";
import {
  ProductImageFragmentFragment,
  ProductLabelFragment,
  ProductMediaGalleryFragment,
  ProductPriceRangeFragment,
} from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  image: ProductImageFragmentFragment | ProductMediaGalleryFragment;
  labels?: ProductLabelFragment | null;
  priceRange?: ProductPriceRangeFragment | null;
  onZoomClick?: () => void;
  enableZoom?: boolean;
}

export const ProductImage: React.FC<Props> = ({
  onZoomClick,
  image,
  labels,
  priceRange,
}) => {
  const { percentageDiscount } = usePriceRange(priceRange);
  if (!image.url) return null;

  return (
    <div className="relative p-10 h-[380px] lg:h-[800px] bg-warm-grey rounded-3xl !flex justify-center items-center">
      <Image
        className="object-contain h-[340px] lg:h-[720px]"
        width={650}
        height={650}
        src={image.url}
        alt={image.label ?? ""}
      />

      <div className="absolute top-4 right-4 flex">
        {percentageDiscount ? (
          <Label variant="powder">{percentageDiscount}</Label>
        ) : null}
      </div>

      <div className="absolute top-4 left-4 flex gap-1 items-center justify-center text-center">
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

      <div className="absolute bottom-4 right-4 flex gap-3">
        <button
          onClick={onZoomClick}
          className="p-2 bg-white flex items-center justify-center text-center rounded-full"
        >
          <FavoriteIcon width={24} height={24} />
        </button>
        {typeof onZoomClick === "function" ? (
          <button
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
