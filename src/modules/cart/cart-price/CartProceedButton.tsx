"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { openToast } from "@/components/_ui/toast-provider";
import { setDeliveryType } from "@/modules/cart/cart-methods/actions";
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
  const searchParams = useSearchParams();
  const activeMethod =
    searchParams.get("method") === DeliveryType.Cac
      ? DeliveryType.Cac
      : DeliveryType.Online;

  const isStoreSet =
    activeMethod === DeliveryType.Cac ? !!selectedStore?.external_id : true;

  const isButtonDisabled =
    disabled || !isCheckoutEnabled || isLoading || !isStoreSet;

  const beginCheckoutGTMEvent = () => {
    if (!cart?.id) {
      return;
    }

    return sendGTMEvent({
      event: "begin_checkout",
      currency: "NOK",
      cart_type: activeMethod,
      value: cart?.prices?.grand_total?.value,
      ...formatGTMCartItems(cart),
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

    await setDeliveryType({
      cartId: cart?.id,
      type: activeMethod as DeliveryType,
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
        aria-label="Fortsett"
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
