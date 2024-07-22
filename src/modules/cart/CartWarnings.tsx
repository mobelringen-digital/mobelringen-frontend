"use client";

import React from "react";

import { CartWarning } from "@/modules/cart/CartWarning";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BaseCartFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
}

export const CartWarnings: React.FC<Props> = ({ cart }) => {
  const { isCheckoutEnabled } = useCart(cart);

  return (
    <>
      {!isCheckoutEnabled ? (
        <CartWarning
          message="Noen av produktene under er dessverre ikke lengre tilgjengelig
                på nett."
        />
      ) : null}
    </>
  );
};
