"use client";

import React from "react";

import { CartWarning } from "@/modules/cart/CartWarning";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BaseCartFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
}

export const CartWarnings: React.FC<Props> = ({ cart }) => {
  const { oneProductNotAvailableOnline, oneProductNotAvailableInStore } =
    useCart(cart);

  return (
    <>
      {oneProductNotAvailableOnline ? (
        <CartWarning
          type="red"
          message="Noen av produktene under er dessverre ikke lengre tilgjengelig på nett."
        />
      ) : null}
      {oneProductNotAvailableInStore ? (
        <CartWarning
          type="yellow"
          message="Noen av produktene er ikke tilgengelig i denne butikken. Velg en annen butikk eller bestill på nett med hjemlevering."
        />
      ) : null}
    </>
  );
};
