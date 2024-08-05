"use client";

import React from "react";

import { openToast } from "@/components/_ui/toast-provider";
import { setShippingMethods } from "@/modules/checkout/shipping/actions";
import { ShippingForm } from "@/modules/checkout/shipping/ShippingForm";
import { AvailableShippingMethodFragment, BaseCartFragment } from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  cart?: BaseCartFragment | null;
}

export const ShippingFormController: React.FC<Props> = ({ cart }) => {
  if (!cart) {
    return null;
  }

  const onSubmit = async (method: AvailableShippingMethodFragment) => {
    if (!method.method_code || !method.carrier_code) {
      return;
    }

    await setShippingMethods(cart.id, {
      carrier_code: method.carrier_code,
      method_code: method.method_code,
    }).then(() => {
      openToast({ content: "Innleveringsmetode er valgt" });
      navigate("/cart/checkout?step=payment");
    });
  };

  return <ShippingForm cart={cart} onSubmit={onSubmit} />;
};
