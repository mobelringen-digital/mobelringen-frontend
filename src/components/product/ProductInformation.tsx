import React from "react";

import Link from "next/link";

import { CardAddToCartButton } from "@/components/product/CardAddToCartButton";
import { BaseProductDataForCardFragment } from "@/types";

interface Props {
  product: BaseProductDataForCardFragment;
  hasAddToCart?: boolean;
}

export const ProductInformation: React.FC<Props> = ({
  product,
  hasAddToCart,
}) => {
  return (
    <>
      {hasAddToCart ? (
        <>
          <div className="flex justify-between items-start gap-4">
            <Link href={`/${product.canonical_url}`}>
              <h5 className="text-sm lg:text-base font-semibold">
                {product.name}
              </h5>
            </Link>
            <CardAddToCartButton product={product} />
          </div>
        </>
      ) : (
        <Link href={`/${product.canonical_url}`}>
          <h5 className="text-sm lg:text-base font-semibold">{product.name}</h5>
        </Link>
      )}

      <Link href={`/${product.canonical_url}`}>
        <p
          className="text-xs lg:text-sm font-normal text-dark-grey"
          dangerouslySetInnerHTML={{
            __html: product.short_description?.html ?? "",
          }}
        />
      </Link>
    </>
  );
};
