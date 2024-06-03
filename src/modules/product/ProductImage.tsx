import React from "react";

import Image from "next/image";

import { ProductImageFragment } from "@/queries/product.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  data: FragmentType<typeof ProductImageFragment>;
}

export const ProductImage: React.FC<Props> = ({ data }) => {
  const image = useFragment(ProductImageFragment, data);

  return (
    <div className="p-10 bg-warm-grey rounded-3xl flex justify-center items-center">
      {image.url ? (
        <Image
          width={650}
          height={650}
          src={image.url}
          alt={image.label ?? ""}
        />
      ) : null}
    </div>
  );
};
