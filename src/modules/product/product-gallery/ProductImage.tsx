import React from "react";

import Image from "next/image";

import { FavoriteIcon } from "@/components/icons/FavoriteIcon";
import { ZoomIcon } from "@/components/icons/ZoomIcon";
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
      <Image width={650} height={650} src={image.url} alt={image.label ?? ""} />

      <div className="absolute top-4 right-4 flex">
        {percentageDiscount ? (
          <span className="bg-powder-dark py-1 px-2 font-semibold uppercase text-black text-xs rounded-xl">
            {percentageDiscount}
          </span>
        ) : null}
      </div>

      <div className="absolute top-4 left-4 flex gap-1 items-center justify-center text-center">
        {labels?.custom ? (
          <>
            {labels.custom.map((label, idx) => (
              <span
                className="bg-black py-1 px-2 font-semibold uppercase text-white text-xs rounded-xl"
                key={idx}
              >
                {label}
              </span>
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
