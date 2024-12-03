"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";
import { useCookies } from "react-cookie";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CartCookie } from "@/components/cart/fetchCartService";
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
  const [_cookies, setCookie] = useCookies<"cart" | "cart_old", CartCookie>([
    "cart",
    "cart_old",
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  if (!cart) {
    return null;
  }

  const addPaymentInfoGTMEvent = (method: AvailablePaymentMethodFragment) => {
    if (!cart?.id) {
      return;
    }

    sendGTMEvent({ ecommerce: null });
    return sendGTMEvent({
      event: "add_payment_info",
      currency: "NOK",
      value: cart?.prices?.grand_total?.value,
      payment_type: method.code,
      ...formatGTMCartItems(cart),
    });
  };

  const removeCartCookie = () => {
    setCookie("cart", "", { expires: new Date(0) });
    setCookie("cart_old", cart.id, { expires: new Date(0) });
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
          removeCartCookie();
          return navigate(data.vippsInitPayment.url);
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
          removeCartCookie();
          return navigate(data.initKlarnaHpp?.redirect_url);
        }
      }

      setIsLoading(false);
      return navigate("/cart/error/unknown-error");
    });
  };

  const goBack = async () => {
    return navigate("/cart/checkout?step=shipping");
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <PaymentForm
        onBack={goBack}
        cart={cart}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
};
