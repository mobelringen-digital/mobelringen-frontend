import React from "react";

import Link from "next/link";

import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const ProductInformation: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/${product.url_key}`}>
      <h5 className="text-sm lg:text-base font-semibold">{product.name}</h5>
      <p
        className="text-xs lg:text-sm font-normal text-dark-grey"
        dangerouslySetInnerHTML={{
          __html: product.short_description?.html ?? "",
        }}
      />
    </Link>
  );
};
