import { notFound } from "next/navigation";

import { getCustomerDetails } from "@/modules/account/account/actions";
import { WishlistList } from "@/modules/account/wishlist/WishlistList";
import { NextServerComponentProps } from "@/utils/ts-utils";

export default async function Wishlist({ params }: NextServerComponentProps) {
  const customer = await getCustomerDetails();
  const wishlist = customer?.wishlists.find((w) => w?.id === params.id);

  if (!wishlist) {
    return notFound();
  }

  return (
    <>
      <WishlistList wishlist={wishlist} />
    </>
  );
}
