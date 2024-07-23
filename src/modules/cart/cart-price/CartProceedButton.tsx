"use client";

import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BaseCartFragment } from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  disabled?: boolean;
  cart?: BaseCartFragment | null;
}

export const CartProceedButton: React.FC<Props> = ({ disabled, cart }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { isCheckoutEnabled } = useCart(cart);
  const navigateToCheckout = async () => {
    setIsLoading(true);
    return navigate("/cart/checkout").finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <Button
        disabled={disabled || !isCheckoutEnabled || isLoading}
        onClick={navigateToCheckout}
        color="tertiary"
        className="w-full mt-4"
      >
        Fortsett til betaling
      </Button>
    </>
  );
};
