"use client";

import React from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { removeProductFromCart } from "@/modules/cart/cart-item/actions";
import { CartItem } from "@/modules/cart/cart-item/CartItem";
import { BaseCartFragment, CartItemFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
}

export const CartItems: React.FC<Props> = ({ cart }) => {
  const [isPending, startTransition] = React.useTransition();
  const [items, setItems] = React.useOptimistic(
    cart?.items,
    (
      state,
      { action, item }: { action: string; item?: CartItemFragment | null },
    ) => {
      switch (action) {
        case "remove":
          return state?.filter((i) => i?.id !== item?.id);
        default:
          return state;
      }
    },
  );

  const handleRemoveProduct = async (itemId: number) => {
    return startTransition(() => {
      setItems({
        action: "remove",
        item: items?.find((i) => i?.id === itemId.toString()),
      });
      removeProductFromCart(itemId);
    });
  };

  return (
    <>
      {isPending ? <PageTopLoader /> : null}
      {items?.map((item, idx) => (
        <CartItem
          cart={cart}
          onRemoveProduct={handleRemoveProduct}
          key={idx}
          item={item}
        />
      ))}
    </>
  );
};
