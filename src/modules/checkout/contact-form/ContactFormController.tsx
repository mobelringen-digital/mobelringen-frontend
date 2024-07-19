import React from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { openToast } from "@/components/_ui/toast-provider";
import { CART_QUERY_KEY } from "@/components/cart/fetchCartService";
import { useCartQuery } from "@/components/cart/useCartQuery";
import {
  setBillingAddressOnCart,
  setShippingAddressOnCart,
} from "@/modules/checkout/contact-form/actions";
import { ContactForm } from "@/modules/checkout/contact-form/ContactForm";
import { BillingAddressInput, InputMaybe, ShippingAddressInput } from "@/types";

interface Props {
  onSuccessfulSubmit: () => void;
}

export const ContactFormController: React.FC<Props> = ({
  onSuccessfulSubmit,
}) => {
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useCartQuery();

  const onSubmit = async (
    shippingAddress: InputMaybe<ShippingAddressInput>,
    billingAddress: BillingAddressInput,
  ) => {
    if (!cart?.id) return;

    await Promise.all([
      setShippingAddressOnCart(cart.id, shippingAddress),
      setBillingAddressOnCart(cart.id, billingAddress),
    ]);
    await queryClient.invalidateQueries({ queryKey: [...CART_QUERY_KEY] });
    openToast({
      content: "Forsendelses- og faktureringsadresser er oppdatert",
    });
    onSuccessfulSubmit();
  };

  if (!cart) return null;

  if (isLoading)
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );

  return <ContactForm cart={cart} onCheckoutFormSubmit={onSubmit} />;
};
