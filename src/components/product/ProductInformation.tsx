import React from "react";

import Link from "next/link";

import { BaseProductDataForCardFragment } from "@/types";

interface Props {
  product: BaseProductDataForCardFragment;
}

export const ProductInformation: React.FC<Props> = ({ product }) => {
  return (
    <Link aria-label={product.name ?? ""} href={`/${product.canonical_url}`}>
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
