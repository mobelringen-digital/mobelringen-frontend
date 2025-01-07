import React from "react";

import { cookies } from "next/headers";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PageTitle } from "@/components/typography/PageTitle";
import { getCustomerDetails } from "@/modules/account/account/actions";
import { CheckoutBreadcrumbs } from "@/modules/checkout/CheckoutBreadcrumbs";
import { CheckoutSteps } from "@/modules/checkout/CheckoutSteps";
import { CheckoutSummary } from "@/modules/checkout/CheckoutSummary";
import { BaseCartFragment, DeliveryType } from "@/types";
import { NextSearchParams } from "@/utils/ts-utils";

interface Props {
  cart?: BaseCartFragment | null;
  searchParams?: NextSearchParams;
  isShippingAddressSet: boolean;
  isShippingMethodSet: boolean;
}

export async function CheckoutPage({
  cart,
  searchParams,
  isShippingMethodSet,
  isShippingAddressSet,
}: Props) {
  const customer = await getCustomerDetails();
  const cookiesStore = await cookies();
  const isClickAndCollect =
    cookiesStore.get("preferredMethod")?.value === DeliveryType.Cac;

  return (
    <ContainerLayout>
      <CheckoutBreadcrumbs />
      <PageTitle>
        {isClickAndCollect
          ? "Bekreft din reservasjon"
          : "Gjennomfør bestilling"}
      </PageTitle>
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
