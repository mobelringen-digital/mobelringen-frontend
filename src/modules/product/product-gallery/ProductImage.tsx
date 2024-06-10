import React from "react";

import Image from "next/image";

import { FavoriteIcon } from "@/components/icons/FavoriteIcon";
import { ZoomIcon } from "@/components/icons/ZoomIcon";
import {
  ProductImageFragmentFragment,
  ProductMediaGalleryFragment,
} from "@/types";

interface Props {
  image: ProductImageFragmentFragment | ProductMediaGalleryFragment;
  onZoomClick?: () => void;
  enableZoom?: boolean;
}

export const ProductImage: React.FC<Props> = ({ onZoomClick, image }) => {
  if (!image.url) return null;

  return (
    <div className="relative p-10 h-[380px] lg:h-[800px] bg-warm-grey rounded-3xl !flex justify-center items-center">
      <Image width={650} height={650} src={image.url} alt={image.label ?? ""} />

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
