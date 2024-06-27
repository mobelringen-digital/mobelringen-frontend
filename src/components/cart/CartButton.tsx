"use client";

import React from "react";

import { useCookies } from "react-cookie";

import Link from "next/link";

import { Cart } from "@/components/_ui/icons/figma/Cart";
import { CartCookie, useCartQuery } from "@/components/cart/useCartQuery";

export const CartButton = () => {
  const [cookies, _setCookie, removeCookie] = useCookies<"cart", CartCookie>([
    "cart",
  ]);
  const { data, isError } = useCartQuery();

  React.useEffect(() => {
    if (isError && cookies.cart) {
      removeCookie("cart");
    }
  }, [cookies.cart, isError, removeCookie]);

  const totalQuantity = React.useMemo(() => {
    if (!data?.items) {
      return 0;
    }
    return data.items.reduce((acc, item) => acc + (item?.quantity ?? 0), 0);
  }, [data?.items]);

  return (
    <Link href="/cart" className="relative">
      <Cart width={24} height={24} />
      {totalQuantity > 0 ? (
        <span className="absolute -right-1 -top-1 w-4 h-4 flex text-[9px] items-center justify-center bg-dark-red text-white rounded-full">
          {totalQuantity <= 9 ? totalQuantity : "9+"}
        </span>
      ) : null}
    </Link>
  );
};
