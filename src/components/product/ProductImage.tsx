import React from "react";

import Image from "next/image";

import { ProductImageFragmentFragment } from "@/types";

interface Props {
  productImage?: ProductImageFragmentFragment | null;
}

export const ProductImage: React.FC<Props> = ({ productImage }) => {
  return (
    <>
      {productImage?.url ? (
        <Image
          width={280}
          height={280}
          src={productImage.url}
          alt={productImage.label ?? ""}
        />
      ) : (
        <div className="w-full h-full bg-warm-grey" />
      )}
    </>
  );
};
