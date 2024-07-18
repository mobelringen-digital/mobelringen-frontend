import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { ContactForm } from "@/modules/checkout/contact-form/ContactForm";

interface Props {
  onSuccessfulSubmit: () => void;
}

export const ContactFormController: React.FC<Props> = ({
  onSuccessfulSubmit,
}) => {
  const { data: cart, isLoading } = useCartQuery();

  if (!cart) return null;

  if (isLoading)
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );

  return <ContactForm cart={cart} onSuccessfulSubmit={onSuccessfulSubmit} />;
};
