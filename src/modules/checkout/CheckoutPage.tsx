import React from "react";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { getCustomerDetails } from "@/modules/account/actions";
import { CheckoutBreadcrumbs } from "@/modules/checkout/CheckoutBreadcrumbs";
import { CheckoutSteps } from "@/modules/checkout/CheckoutSteps";
import { CheckoutSummary } from "@/modules/checkout/CheckoutSummary";
import { CheckoutTitle } from "@/modules/checkout/CheckoutTitle";
import { BaseCartFragment } from "@/types";
import { NextSearchParams } from "@/utils/ts-utils";

interface Props {
  cart?: BaseCartFragment | null;
  searchParams?: NextSearchParams;
}

export async function CheckoutPage({ cart, searchParams }: Props) {
  const customer = await getCustomerDetails();
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
            searchParams={searchParams}
            customer={customer}
            cart={cart}
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
}
