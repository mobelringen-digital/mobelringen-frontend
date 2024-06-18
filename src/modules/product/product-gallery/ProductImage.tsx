import React from "react";

import Image from "next/image";

import { ZoomIcon } from "@/components/_ui/icons/ZoomIcon";
import { Label } from "@/components/_ui/label/Label";
import { AddToWishList } from "@/components/product/add-to-wishlist/AddToWishList";
import { BaseProductFragment } from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  product: BaseProductFragment;
  onZoomClick?: () => void;
  enableZoom?: boolean;
}

export const ProductImage: React.FC<Props> = ({ onZoomClick, product }) => {
  const { percentageDiscount } = usePriceRange(product.price_range);
  if (!product.image?.url) return null;

  return (
    <div className="relative p-10 h-[380px] lg:h-[800px] bg-warm-grey rounded-3xl !flex justify-center items-center">
      <Image
        className="object-contain h-[340px] lg:h-[720px]"
        width={650}
        height={650}
        src={product.image.url}
        alt={product.image.label ?? ""}
      />

      <div className="absolute top-4 right-4 flex">
        {percentageDiscount ? (
          <Label variant="powder">{percentageDiscount}</Label>
        ) : null}
      </div>

      <div className="absolute top-4 left-4 flex gap-1 items-center justify-center text-center">
        {product.productLabel?.custom ? (
          <>
            {product.productLabel.custom.map((label, idx) => (
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
          className="bg-white flex items-center justify-center text-center rounded-full"
        >
          <AddToWishList className="!p-2" product={product} />
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
