"use client";

import React from "react";

import { openToast } from "@/components/_ui/toast-provider";
import { useCart } from "@/modules/cart/hooks/useCart";
import {
  setAddressesOnCart,
  setGuestEmailOnCart,
} from "@/modules/checkout/contact-form/actions";
import { ContactForm } from "@/modules/checkout/contact-form/ContactForm";
import { CheckoutFormData } from "@/modules/checkout/factories";
import { placeOrder } from "@/modules/checkout/payment/actions";
import { BaseCartFragment, CustomerQuery } from "@/types";
import { useSession } from "@/utils/hooks/useSession";

import { navigate } from "../../../app/actions";

interface Props {
  customer?: CustomerQuery;
  cart?: BaseCartFragment | null;
}

export const ContactFormController: React.FC<Props> = ({ customer, cart }) => {
  const { token } = useSession();
  const { isClickAndCollect } = useCart(cart);

  const onSubmit = async (values: CheckoutFormData) => {
    if (!cart?.id) return;

    if (!token && values.email) {
      await setGuestEmailOnCart(cart.id, values.email);
    }
    await setAddressesOnCart(cart.id, values);

    if (isClickAndCollect) {
      const order = await placeOrder(cart.id);
      return navigate(`/cart/success?order_id=${order?.order_id}`);
    } else {
      openToast({
        content: "Forsendelses- og faktureringsadresser er oppdatert",
      });
    }

    return navigate("/cart/checkout?step=shipping");
  };

  if (!cart) return null;

  return (
    <ContactForm
      customer={customer}
      cart={cart}
      onCheckoutFormSubmit={onSubmit}
      isAuthorized={!!token}
    />
  );
};
