import React from "react";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CheckoutBreadcrumbs } from "@/modules/checkout/CheckoutBreadcrumbs";
import { CheckoutSteps } from "@/modules/checkout/CheckoutSteps";
import { CheckoutSummary } from "@/modules/checkout/CheckoutSummary";
import { CheckoutTitle } from "@/modules/checkout/CheckoutTitle";
import { BaseCartFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
}

export const CheckoutPage: React.FC<Props> = ({ cart }) => {
  const isShippingAddressSet = !!cart?.shipping_addresses?.length;
  const isShippingMethodSet =
    !!cart?.shipping_addresses[0]?.selected_shipping_method;

  return (
    <ContainerLayout>
      <CheckoutBreadcrumbs />
      <CheckoutTitle />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <CheckoutSteps
            isShippingAddressSet={isShippingAddressSet}
            isShippingMethodSet={isShippingMethodSet}
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <CheckoutSummary cart={cart} />
        </div>
      </div>
      <Debugger data={cart} />
    </ContainerLayout>
  );
};
