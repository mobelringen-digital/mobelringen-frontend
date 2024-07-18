import React from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { openToast } from "@/components/_ui/toast-provider";
import { CART_QUERY_KEY } from "@/components/cart/fetchCartService";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { ContactForm } from "@/modules/checkout/contact-form/ContactForm";
import { useSetBillingAddressOnCartMutation } from "@/modules/checkout/contact-form/useSetBillingAddressOnCart";
import { useSetShippingAddressOnCartMutation } from "@/modules/checkout/contact-form/useSetShippingAddressOnCart";
import { BillingAddressInput, InputMaybe, ShippingAddressInput } from "@/types";

interface Props {
  onSuccessfulSubmit: () => void;
}

export const ContactFormController: React.FC<Props> = ({
  onSuccessfulSubmit,
}) => {
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useCartQuery();
  const { mutateAsync: setShippingAddressOnCart } =
    useSetShippingAddressOnCartMutation();
  const { mutateAsync: setBillingAddressOnCart } =
    useSetBillingAddressOnCartMutation();

  const onSubmit = async (
    shippingAddress: InputMaybe<ShippingAddressInput>,
    billingAddress: BillingAddressInput,
  ) => {
    await Promise.all([
      setShippingAddressOnCart([
        {
          ...shippingAddress,
        },
      ]),
      setBillingAddressOnCart({
        ...billingAddress,
      }),
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
