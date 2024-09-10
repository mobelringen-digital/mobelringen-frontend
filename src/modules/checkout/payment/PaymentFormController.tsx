"use client";

import React from "react";

import {
  initKlarnaHpp,
  setPaymentMethodOnCart,
  vippsInitPayment,
} from "@/modules/checkout/payment/actions";
import { PaymentForm } from "@/modules/checkout/payment/PaymentForm";
import { AvailablePaymentMethodFragment, BaseCartFragment } from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  cart?: BaseCartFragment | null;
}

export const PaymentFormController: React.FC<Props> = ({ cart }) => {
  if (!cart) {
    return null;
  }

  const onSubmit = async (method: AvailablePaymentMethodFragment) => {
    if (!method.code) {
      return;
    }

    setPaymentMethodOnCart(cart.id, {
      code: method.code,
    }).then(async () => {
      if (method.code.includes("vipps")) {
        const data = await vippsInitPayment({
          cart_id: cart.id,
          fallback_url: `${window.location.origin}/cart/success`,
        });

        if (data?.vippsInitPayment?.url) {
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
          return (window.location.href = data.initKlarnaHpp?.redirect_url);
        }
      }

      return navigate("/cart/error/unknown-error");
    });
  };

  return <PaymentForm cart={cart} onSubmit={onSubmit} />;
};
