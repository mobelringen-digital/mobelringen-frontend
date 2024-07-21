import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { openToast } from "@/components/_ui/toast-provider";
import { useCartQuery } from "@/components/cart/useCartQuery";
import {
  placeOrder,
  setPaymentMethodOnCart,
  vippsInitPayment,
} from "@/modules/checkout/payment/actions";
import { PaymentForm } from "@/modules/checkout/payment/PaymentForm";
import { AvailablePaymentMethodFragment } from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  onSuccessfulSubmit: () => void;
}

export const PaymentFormController: React.FC<Props> = () => {
  const { data: cart, isLoading } = useCartQuery();

  if (isLoading) {
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );
  }

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
      await placeOrder(cart.id).then(() =>
        openToast({ content: "Bestillingen vellykket" }),
      );
      if (method.code === "vipps") {
        const data = await vippsInitPayment({
          cart_id: cart.id,
          fallback_url: `${window.location.origin}/cart/success`,
        });

        if (data?.vippsInitPayment?.url) {
          return (window.location.href = data.vippsInitPayment.url);
        }
      }

      return navigate("/cart/success");
    });
  };

  return <PaymentForm cart={cart} onSubmit={onSubmit} />;
};
