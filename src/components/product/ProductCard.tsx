import React from "react";

import cx from "classnames";

import Link from "next/link";

import { AddToWishList } from "@/components/product/add-to-wishlist/AddToWishList";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInformation } from "@/components/product/ProductInformation";
import { ProductLabels } from "@/components/product/ProductLabels";
import { ProductPricing } from "@/components/product/ProductPricing";
import { ProductStock } from "@/components/product/ProductStock";
import { BaseProductDataForCardFragment } from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  product: BaseProductDataForCardFragment;
  className?: string;
  onClick?: (product: BaseProductDataForCardFragment) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  className,
  onClick,
}) => {
  const priceRange = product?.price_range;
  const productImage = product?.image;
  const labels = product?.productLabel;
  const { percentageDiscount } = usePriceRange(priceRange);

  if (!product) return null;

  return (
    <div className={cx("relative flex w-full flex-col", className)}>
      <Link
        legacyBehavior={false}
        onClick={onClick ? () => onClick(product) : undefined}
        className="relative flex items-center justify-center bg-warm-grey px-2 lg:px-6 py-8 lg:py-12 rounded-2xl h-[240px] lg:h-[420px]"
        href={`/${product.canonical_url}`}
      >
        <ProductImage productImage={productImage} />
        <ProductLabels
          lowPrice={product.low_price}
          discount={percentageDiscount}
          labels={labels}
          addToWishList={
            <>
              {product.sku ? <AddToWishList productSku={product.sku} /> : null}
            </>
          }
        />
      </Link>
      <div className="mt-4 px-2 pb-2 mb-2 border-b border-b-cold-grey-dark">
        <ProductInformation product={product} />
        <ProductPricing priceRange={priceRange} />
      </div>
      <ProductStock product={product} />
    </div>
  );
};
