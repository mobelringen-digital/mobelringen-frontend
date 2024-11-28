import React from "react";

import { cookies } from "next/headers";
import Link from "next/link";

import { Cart } from "@/components/_ui/icons/figma/Cart";
import getCart from "@/components/cart/actions";

export async function HeaderCartButton() {
  const data = await getCart();
  const cookiesStore = cookies();
  const preferredMethod = cookiesStore.get("preferredMethod");

  const totalQuantity =
    data?.items?.reduce((acc, item) => acc + (item?.quantity ?? 0), 0) ?? 0;

  return (
    <Link
      aria-label="Cart"
      href={
        preferredMethod?.value
          ? `/cart?method=${preferredMethod?.value}`
          : "/cart"
      }
      className="relative"
    >
      <Cart width={24} height={24} />
      {totalQuantity > 0 ? (
        <span className="absolute -right-1 -top-1 w-4 h-4 flex text-[9px] items-center justify-center bg-dark-red text-white rounded-full">
          {totalQuantity <= 9 ? totalQuantity : "9+"}
        </span>
      ) : null}
    </Link>
  );
}
