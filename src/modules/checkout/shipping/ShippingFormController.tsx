import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { openToast } from "@/components/_ui/toast-provider";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { setShippingMethods } from "@/modules/checkout/shipping/actions";
import { ShippingForm } from "@/modules/checkout/shipping/ShippingForm";
import { AvailableShippingMethodFragment } from "@/types";

interface Props {
  onSuccessfulSubmit: () => void;
}

export const ShippingFormController: React.FC<Props> = ({
  onSuccessfulSubmit,
}) => {
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

  const onSubmit = async (method: AvailableShippingMethodFragment) => {
    if (!method.method_code || !method.carrier_code) {
      return;
    }

    await setShippingMethods(cart.id, {
      carrier_code: method.carrier_code,
      method_code: method.method_code,
    }).then(() => {
      openToast({ content: "Innleveringsmetode er valgt" });
      onSuccessfulSubmit();
    });
  };

  return <ShippingForm cart={cart} onSubmit={onSubmit} />;
};
