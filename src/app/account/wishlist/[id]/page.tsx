import { notFound } from "next/navigation";

import { getCustomerDetails } from "@/modules/account/account/actions";
import { WishlistItemsList } from "@/modules/account/wishlist/wishlist-items-list/WishlistItemsList";
import { NextServerComponentProps } from "@/utils/ts-utils";

export default async function Wishlist({ params }: NextServerComponentProps) {
  const paramsData = await params;
  const customer = await getCustomerDetails();
  const wishlist = customer?.wishlists.find((w) => w?.id === paramsData.id);

  if (!wishlist) {
    return notFound();
  }

  return (
    <>
      <WishlistItemsList wishlist={wishlist} />
    </>
  );
}
