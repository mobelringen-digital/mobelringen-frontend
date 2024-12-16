"use client";

import React from "react";

import { Debugger } from "@/components/Debugger";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { CreateWishlistModal } from "@/modules/account/wishlist/create-wishlist/CreateWishlistModal";
import { WishlistBlock } from "@/modules/account/wishlist/wishlist-block/WishlistBlock";
import { CustomerDataFragment } from "@/types";

interface Props {
  wishlist?: CustomerDataFragment["wishlists"];
}

export const WishlistPage: React.FC<Props> = ({ wishlist }) => {
  const [addNewWishlist, setAddNewWishlist] = React.useState(false);
  const canBeEdited = wishlist && wishlist?.length > 1;

  return (
    <AccountPageLayout
      title="Ønskelister"
      // rightContent={
      //   <Button
      //     color="secondary"
      //     onPress={() => setAddNewWishlist(true)}
      //     className="bg-warm-grey rounded-full p-4"
      //   >
      //     Lag ny ønskeliste
      //   </Button>
      // }
    >
      {addNewWishlist ? (
        <CreateWishlistModal
          isOpen={addNewWishlist}
          onClose={() => setAddNewWishlist(false)}
        />
      ) : null}

      <div className="flex flex-col gap-4">
        {wishlist?.map((item) => {
          return (
            <WishlistBlock
              key={item?.id}
              item={item}
              canBeEdited={canBeEdited}
            />
          );
        })}
      </div>

      <Debugger data={wishlist} />
    </AccountPageLayout>
  );
};
