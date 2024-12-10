import React from "react";

import { Debugger } from "@/components/Debugger";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { WishlistListItem } from "@/modules/account/wishlist/WishlistListItem";
import { CustomerDataFragment } from "@/types";

interface Props {
  wishlist?: CustomerDataFragment["wishlists"];
}

export const WishlistPage: React.FC<Props> = ({ wishlist }) => {
  return (
    <AccountPageLayout title="Ønskelister">
      <div className="flex flex-col gap-4">
        {wishlist?.map((item) => {
          const isMoreThanFour = (item?.items_v2?.items?.length ?? 0) > 4;

          return (
            <WishlistListItem
              key={item?.id}
              isMoreThanFour={isMoreThanFour}
              item={item}
            />
          );
        })}
      </div>

      <Debugger data={wishlist} />
    </AccountPageLayout>
  );
};
