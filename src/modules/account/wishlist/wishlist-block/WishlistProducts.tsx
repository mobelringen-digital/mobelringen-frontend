import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { CustomerWishlistFragment } from "@/types";

interface Props {
  item?: CustomerWishlistFragment | null;
  show: number;
  total: number;
}

const PRODUCT_GRID_BY_LIMIT: Record<number, string> = {
  4: "grid-cols-5",
  3: "grid-cols-4",
  2: "grid-cols-3",
};

export const WishlistProducts: React.FC<Props> = ({ item, show, total }) => {
  const isMoreThanLimit = total > show;

  return (
    <ul className={cx("grid gap-6", PRODUCT_GRID_BY_LIMIT[show])}>
      {item?.items_v2?.items
        ?.slice(0, isMoreThanLimit ? show : total)
        .map((product) => {
          return (
            <li
              key={product?.id}
              className={cx(
                "p-6 bg-warm-grey rounded-2xl !flex justify-center items-center",
              )}
            >
              {product?.product?.small_image?.url ? (
                <div className={cx("relative w-full ")}>
                  <Image
                    className="object-contain h-[100px] md:h-[90px] lg:[280px]"
                    width={280}
                    height={280}
                    src={product.product.small_image.url}
                    alt={product.product.name ?? ""}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      {isMoreThanLimit ? (
        <li
          className={cx(
            "relative p-6 lg:p-10 flex-shrink-0 bg-warm-grey rounded-2xl !flex justify-center items-center",
          )}
        >
          <Link href={`/account/wishlist/${item?.id}`}>
            <div className="text-xs md:text-sm lg:text-xl font-feature">
              +{total - show} produkter
            </div>
          </Link>
        </li>
      ) : null}
    </ul>
  );
};
