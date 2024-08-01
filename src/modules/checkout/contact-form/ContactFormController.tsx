import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { openToast } from "@/components/_ui/toast-provider";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { useCart } from "@/modules/cart/hooks/useCart";
import {
  setAddressesOnCart,
  setGuestEmailOnCart,
} from "@/modules/checkout/contact-form/actions";
import { ContactForm } from "@/modules/checkout/contact-form/ContactForm";
import { placeOrder } from "@/modules/checkout/payment/actions";
import {
  BillingAddressInput,
  CustomerQuery,
  InputMaybe,
  ShippingAddressInput,
} from "@/types";
import { useSession } from "@/utils/hooks/useSession";

import { navigate } from "../../../app/actions";

interface Props {
  onSuccessfulSubmit: () => void;
  customer?: CustomerQuery;
}

export const ContactFormController: React.FC<Props> = ({
  onSuccessfulSubmit,
  customer,
}) => {
  const { data: cart, isLoading } = useCartQuery();
  const { token } = useSession();
  const { isClickAndCollect } = useCart(cart);

  const onSubmit = async (
    shippingAddress: InputMaybe<ShippingAddressInput>,
    billingAddress: BillingAddressInput,
    email?: string | null,
  ) => {
    if (!cart?.id) return;

    if (!token && email) {
      await setGuestEmailOnCart(cart.id, email);
    }
    await setAddressesOnCart(cart.id, shippingAddress, billingAddress);

    if (isClickAndCollect) {
      const order = await placeOrder(cart.id);
      return navigate(`/cart/success?order_id=${order?.order_id}`);
    } else {
      openToast({
        content: "Forsendelses- og faktureringsadresser er oppdatert",
      });
      onSuccessfulSubmit();
    }
  };

  if (!cart) return null;

  if (isLoading)
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );

  return (
    <ContactForm
      customer={customer}
      cart={cart}
      onCheckoutFormSubmit={onSubmit}
      isAuthorized={!!token}
    />
  );
};
