import React from "react";

import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";

import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { WishlistProducts } from "@/modules/account/wishlist/wishlist-block/WishlistProducts";
import { CustomerWishlistFragment } from "@/types";

interface Props {
  item?: CustomerWishlistFragment | null;
  canBeEdited?: boolean;
}

export const WishlistBlock: React.FC<Props> = ({ item, canBeEdited }) => {
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

      <div className="hidden lg:block">
        <WishlistProducts
          show={3}
          total={item?.items_v2?.items?.length ?? 0}
          item={item}
        />
      </div>

      <div className="block lg:hidden">
        <WishlistProducts
          show={2}
          total={item?.items_v2?.items?.length ?? 0}
          item={item}
        />
      </div>

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
