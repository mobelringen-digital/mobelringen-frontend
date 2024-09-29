"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { CartWarning } from "@/modules/cart/CartWarning";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BaseCartFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
}

export const CartWarnings: React.FC<Props> = ({ cart }) => {
  const router = useRouter();
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
          message={
            <>
              Noen av produktene er ikke tilgengelig i denne butikken.{" "}
              <button
                className="underline"
                onClick={() => router.push(`${window.location}&store=select`)}
              >
                Velg en annen butikk
              </button>{" "}
              eller bestill på nett med hjemlevering.
            </>
          }
        />
      ) : null}
    </>
  );
};
