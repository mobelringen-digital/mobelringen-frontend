"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import {
  initKlarnaHpp,
  setPaymentMethodOnCart,
  vippsInitPayment,
} from "@/modules/checkout/payment/actions";
import { PaymentForm } from "@/modules/checkout/payment/PaymentForm";
import { AvailablePaymentMethodFragment, BaseCartFragment } from "@/types";
import { formatGTMCartItems } from "@/utils/gtm";

import { navigate } from "../../../app/actions";

interface Props {
  cart?: BaseCartFragment | null;
}

export const PaymentFormController: React.FC<Props> = ({ cart }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  if (!cart) {
    return null;
  }

  const addPaymentInfoGTMEvent = (method: AvailablePaymentMethodFragment) => {
    if (!cart?.id) {
      return;
    }

    return sendGTMEvent({
      event: "add_payment_info",
      currency: "NOK",
      value: cart?.prices?.grand_total?.value,
      payment_type: method.code,
      ...formatGTMCartItems(cart),
    });
  };

  const onSubmit = async (method: AvailablePaymentMethodFragment) => {
    if (!method.code) {
      return;
    }
    setIsLoading(true);

    return setPaymentMethodOnCart(cart.id, {
      code: method.code,
    }).then(async () => {
      if (method.code.includes("vipps")) {
        const data = await vippsInitPayment({
          cart_id: cart.id,
          fallback_url: `${window.location.origin}/cart/success`,
        });

        if (data?.vippsInitPayment?.url) {
          addPaymentInfoGTMEvent(method);
          setIsLoading(false);
          return (window.location.href = data.vippsInitPayment.url);
        }
      }

      if (method.code.includes("klarna")) {
        const data = await initKlarnaHpp({
          cartId: cart.id,
          frontendUrl: window.location.origin,
          paymentMethod: method.code,
        });

        if (data.initKlarnaHpp?.redirect_url) {
          addPaymentInfoGTMEvent(method);
          setIsLoading(false);
          return (window.location.href = data.initKlarnaHpp?.redirect_url);
        }
      }

      setIsLoading(false);
      return navigate("/cart/error/unknown-error");
    });
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <PaymentForm cart={cart} onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
};
