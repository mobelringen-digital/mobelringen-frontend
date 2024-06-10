import React from "react";

import Image from "next/image";

import {
  ProductImageFragmentFragment,
  ProductMediaGalleryFragment,
} from "@/types";

interface Props {
  image: ProductImageFragmentFragment | ProductMediaGalleryFragment;
  onClick?: () => void;
}

export const ProductImage: React.FC<Props> = ({ onClick, image }) => {
  if (!image.url) return null;

  return (
    <div className="relative p-10 h-[380px] lg:h-[800px] bg-warm-grey rounded-3xl !flex justify-center items-center">
      <Image
        width={650}
        height={650}
        src={image.url}
        alt={image.label ?? ""}
        onClick={onClick}
      />
    </div>
  );
};
