import React from "react";

import { Debugger } from "@/components/Debugger";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { WishListFragmentFragment } from "@/types";

interface Props {
  wishlist?: WishListFragmentFragment | null;
}

export const WishlistPage: React.FC<Props> = ({ wishlist }) => {
  return (
    <AccountPageLayout title="Ønskelister">
      <Debugger data={wishlist} />
    </AccountPageLayout>
  );
};
