import React from "react";

import cx from "classnames";

import Image from "next/image";

import { CARD_SIZE } from "@/components/product/ProductCard";
import { ProductImageFragmentFragment } from "@/types";

interface Props {
  productImage?: ProductImageFragmentFragment | null;
  cardHeight?: keyof typeof CARD_SIZE;
}

export const ProductImage: React.FC<Props> = ({ productImage, cardHeight }) => {
  return (
    <>
      {productImage?.url ? (
        <Image
          className={cx("object-contain", {
            "h-[200px] lg:h-[360px]": cardHeight === "large",
            "h-[120px] lg:h-[150px]": cardHeight === "small",
          })}
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
