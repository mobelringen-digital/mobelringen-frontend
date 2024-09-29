"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { setDeliveryType } from "@/modules/cart/cart-methods/actions";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BaseCartFragment, BaseStoreFragment } from "@/types";
import { formatGTMCartItems } from "@/utils/gtm";
import { DELIVERY_TYPE_MAP } from "@/utils/helpers";

import { navigate } from "../../../app/actions";

interface Props {
  disabled?: boolean;
  cart?: BaseCartFragment | null;
  selectedStore?: BaseStoreFragment | null;
}

export const CartProceedButton: React.FC<Props> = ({
  disabled,
  cart,
  selectedStore,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { isCheckoutEnabled } = useCart(cart);
  const searchParams = useSearchParams();
  const activeMethod = searchParams.get("method") ?? "online";

  const isStoreSet =
    activeMethod === "collect" ? !!selectedStore?.external_id : true;

  const isButtonDisabled =
    disabled || !isCheckoutEnabled || isLoading || !isStoreSet;

  const beginCheckoutGTMEvent = () => {
    if (!cart?.id) {
      return;
    }

    return sendGTMEvent({
      event: "begin_checkout",
      currency: "NOK",
      value: cart?.prices?.grand_total?.value,
      ...formatGTMCartItems(cart),
    });
  };

  const navigateToCheckout = async () => {
    if (isButtonDisabled) return;
    if (!cart?.id) return;

    setIsLoading(true);
    await setDeliveryType({
      cartId: cart?.id,
      type: DELIVERY_TYPE_MAP[activeMethod as keyof typeof DELIVERY_TYPE_MAP],
    });
    return navigate("/cart/checkout").finally(() => {
      beginCheckoutGTMEvent();
      setIsLoading(false);
    });
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <Button
        disabled={isButtonDisabled}
        onClick={navigateToCheckout}
        color="tertiary"
        className="w-full mt-4"
      >
        Fortsett
      </Button>
    </>
  );
};
