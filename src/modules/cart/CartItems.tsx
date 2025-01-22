"use client";

import React from "react";

import { removeProductFromCart } from "@/modules/cart/cart-item/actions";
import { CartItem } from "@/modules/cart/cart-item/CartItem";
import { BaseCartFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
}

export const CartItems: React.FC<Props> = ({ cart }) => {
  const handleRemoveProduct = async (itemId: number) => {
    return removeProductFromCart(itemId);
  };

  return (
    <>
      {cart?.items?.map((item, idx) => (
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
