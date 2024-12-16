import React from "react";

import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { CustomerWishlistFragment } from "@/types";

interface Props {
  item?: CustomerWishlistFragment | null;
  isMoreThanFour: boolean;
  canBeEdited?: boolean;
}

export const WishlistListItem: React.FC<Props> = ({
  item,
  isMoreThanFour,
  canBeEdited,
}) => {
  if (!item) return null;

  return (
    <div className="bg-white p-8 rounded-3xl flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-feature">{item?.name}</h2>
        {canBeEdited ? (
          <div className="flex gap-2">
            <button className="bg-warm-grey rounded-full p-4">
              <EditIcon />
            </button>
            <button className="bg-warm-grey rounded-full p-4">
              <DeleteIcon />
            </button>
          </div>
        ) : null}
      </div>

      <ul className="flex flex-shrink-0 gap-4 lg:gap-8 justify-between lg:flex-nowrap">
        {item?.items_v2?.items
          ?.slice(0, isMoreThanFour ? 3 : 4)
          .map((product) => {
            return (
              <li key={product?.id}>
                {product?.product?.small_image?.url ? (
                  <div className="relative p-6 lg:p-10 h-[70px] md:h-[100px] lg:h-[200px] bg-warm-grey rounded-2xl !flex justify-center items-center">
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
        {isMoreThanFour ? (
          <Link
            className="relative flex-shrink-0"
            href={`/account/wishlist/${item?.id}`}
          >
            <li className=" p-6 lg:p-10 w=[70px] h-[70px] md:w-[100px] md:h-[100px] lg:w-[200px] lg:h-[200px] bg-warm-grey rounded-2xl !flex justify-center items-center">
              <div className="text-xs md:text-sm lg:text-xl font-feature">
                +{(item?.items_v2?.items.length ?? 0) - 3} produkter
              </div>
            </li>
          </Link>
        ) : null}
      </ul>

      <div className="block">
        <Button
          color="secondary"
          as={Link}
          href={`/account/wishlist/${item?.id}`}
        >
          Utforsk ønskelisten
        </Button>
      </div>
    </div>
  );
};
