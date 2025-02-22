"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { openToast } from "@/components/_ui/toast-provider";
import { validateCart } from "@/modules/cart/cart-price/actions";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BaseCartFragment, BaseStoreFragment, DeliveryType } from "@/types";
import { formatGTMCartItems } from "@/utils/gtm";

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
  const activeMethod = cart?.delivery_type ?? DeliveryType.Online;

  const isStoreSet =
    activeMethod === DeliveryType.Cac ? !!selectedStore?.external_id : true;

  const isButtonDisabled =
    disabled || !isCheckoutEnabled || isLoading || !isStoreSet;

  const beginCheckoutGTMEvent = () => {
    if (!cart?.id) {
      return;
    }

    sendGTMEvent({ ecommerce: null });
    return sendGTMEvent({
      event: "begin_checkout",
      ecommerce: {
        currency: "NOK",
        cart_type: activeMethod,
        value: cart?.prices?.grand_total?.value,
        ...formatGTMCartItems(cart),
      },
    });
  };

  const navigateToCheckout = async () => {
    if (isButtonDisabled) return;
    if (!cart?.id) return;

    setIsLoading(true);
    const validateOutdatedCart = await validateCart(cart.id);

    if (!validateOutdatedCart?.success) {
      setIsLoading(false);
      return openToast({ content: validateOutdatedCart?.message });
    }

    return navigate("/cart/checkout").finally(() => {
      beginCheckoutGTMEvent();
      setIsLoading(false);
    });
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <Button
        aria-label="Fortsett"
        disabled={isButtonDisabled}
        onPress={navigateToCheckout}
        color="tertiary"
        className="w-full mt-4"
      >
        Fortsett
      </Button>
    </>
  );
};
