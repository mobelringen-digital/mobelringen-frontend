"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { openToast } from "@/components/_ui/toast-provider";
import { setShippingMethods } from "@/modules/checkout/shipping/actions";
import { ShippingForm } from "@/modules/checkout/shipping/ShippingForm";
import { AvailableShippingMethodFragment, BaseCartFragment } from "@/types";
import { formatGTMCartItems } from "@/utils/gtm";

import { navigate } from "../../../app/actions";

interface Props {
  cart?: BaseCartFragment | null;
}

export const ShippingFormController: React.FC<Props> = ({ cart }) => {
  if (!cart) {
    return null;
  }

  const addShippingInfoGTMEvent = (method: AvailableShippingMethodFragment) => {
    if (!cart?.id) {
      return;
    }

    return sendGTMEvent({
      event: "add_shipping_info",
      currency: "NOK",
      value: cart?.prices?.grand_total?.value,
      shipping_tier: method.method_code,
      ...formatGTMCartItems(cart),
    });
  };

  const onSubmit = async (method: AvailableShippingMethodFragment) => {
    if (!method.method_code || !method.carrier_code) {
      return;
    }

    await setShippingMethods(cart.id, {
      carrier_code: method.carrier_code,
      method_code: method.method_code,
    }).then(() => {
      addShippingInfoGTMEvent(method);
      openToast({ content: "Innleveringsmetode er valgt" });
      navigate("/cart/checkout?step=payment");
    });
  };

  return <ShippingForm cart={cart} onSubmit={onSubmit} />;
};
