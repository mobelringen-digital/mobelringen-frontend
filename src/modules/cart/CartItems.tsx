"use client";

import React from "react";

import { removeProductFromCart } from "@/modules/cart/cart-item/actions";
import { CartItem } from "@/modules/cart/cart-item/CartItem";
import { CartItemFragment } from "@/types";

interface Props {
  data: Array<CartItemFragment | null>;
}

export const CartItems: React.FC<Props> = ({ data }) => {
  const [items, setItems] = React.useOptimistic(
    data,
    (
      state,
      { action, item }: { action: string; item?: CartItemFragment | null },
    ) => {
      switch (action) {
        case "remove":
          return state.filter((i) => i?.id !== item?.id);
        default:
          return state;
      }
    },
  );

  const handleRemoveProduct = async (itemId: number) => {
    setItems({
      action: "remove",
      item: items.find((i) => i?.id === itemId.toString()),
    });
    return removeProductFromCart(itemId);
  };

  return (
    <>
      {items?.map((item, idx) => (
        <CartItem onRemoveProduct={handleRemoveProduct} key={idx} item={item} />
      ))}
    </>
  );
};
