"use client";

import { CartIcon } from "@/components/icons/CartIcon";

import { useCartQuery } from "./useCartQuery";

export const Cart = () => {
  const { data } = useCartQuery();

  return (
    <button className="flex gap-1">
      {data?.length}
      <CartIcon />
    </button>
  );
};
