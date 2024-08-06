"use client";

import React from "react";

import { openToast } from "@/components/_ui/toast-provider";
import {
  reserveOrder,
  setAddressesOnCart,
  setGuestEmailOnCart,
} from "@/modules/checkout/contact-form/actions";
import { ContactForm } from "@/modules/checkout/contact-form/ContactForm";
import { CheckoutFormData } from "@/modules/checkout/factories";
import { BaseCartFragment, CustomerQuery } from "@/types";
import { useSession } from "@/utils/hooks/useSession";

import { navigate } from "../../../app/actions";

interface Props {
  customer?: CustomerQuery;
  cart?: BaseCartFragment | null;
  isClickAndCollect?: boolean;
}

export const ContactFormController: React.FC<Props> = ({
  customer,
  cart,
  isClickAndCollect,
}) => {
  const { token } = useSession();

  const onSubmit = async (values: CheckoutFormData) => {
    if (!cart?.id) return;

    if (isClickAndCollect) {
      return reserveOrder(cart.id, values);
    } else {
      if (!token && values.email) {
        await setGuestEmailOnCart(cart.id, values.email);
      }
      await setAddressesOnCart(cart.id, values);
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
      isClickAndCollect={isClickAndCollect}
    />
  );
};
