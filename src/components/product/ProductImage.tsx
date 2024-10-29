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
          className="object-contain h-[200px] lg:h-[360px]"
          width={250}
          height={250}
          src={`${productImage.url}?quality=100&fit=bounds&height=250&width=250`}
          alt={productImage.label ?? ""}
        />
      ) : (
        <div className="w-full h-full bg-warm-grey" />
      )}
    </>
  );
};
