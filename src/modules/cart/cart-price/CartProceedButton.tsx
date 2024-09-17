"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BaseCartFragment } from "@/types";
import { formatGTMCartItems } from "@/utils/gtm";

import { navigate } from "../../../app/actions";

interface Props {
  disabled?: boolean;
  cart?: BaseCartFragment | null;
}

export const CartProceedButton: React.FC<Props> = ({ disabled, cart }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { isCheckoutEnabled } = useCart(cart);

  const beginCheckoutGTMEvent = () => {
    if (!cart?.id) {
      return;
    }

    return sendGTMEvent({
      event: "begin_checkout",
      currency: "NOK",
      value: cart?.prices?.grand_total,
      ...formatGTMCartItems(cart),
    });
  };

  const navigateToCheckout = async () => {
    if (!isCheckoutEnabled) return;

    setIsLoading(true);
    return navigate("/cart/checkout").finally(() => {
      beginCheckoutGTMEvent();
      setIsLoading(false);
    });
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
