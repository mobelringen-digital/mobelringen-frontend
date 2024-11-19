import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import getCart from "@/components/cart/actions";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { getToken } from "@/modules/auth/actions";
import { CheckoutPage } from "@/modules/checkout/CheckoutPage";
import { BaseCartFragment } from "@/types";
import { NextSearchParams } from "@/utils/ts-utils";

import { navigate } from "../../actions";

export default async function Checkout({
  searchParams,
}: {
  searchParams?: NextSearchParams;
}) {
  const cart = await getCart();
  const token = await getToken();

  if (token && !cart) {
    return navigate("/auth/login?token=EXPIRED");
  }

  const isShippingAddressSet = !!cart?.shipping_addresses?.length;
  const isShippingMethodSet =
    !!cart?.shipping_addresses[0]?.selected_shipping_method;

  if (searchParams?.step === "shipping" && !isShippingAddressSet) {
    return navigate("/cart/checkout?step=contact");
  }

  if (searchParams?.step === "payment" && !isShippingMethodSet) {
    return navigate("/cart/checkout?step=shipping");
  }

  return (
    <Suspense fallback={<PageTopLoader />}>
      <CheckoutPage
        isShippingMethodSet={isShippingMethodSet}
        isShippingAddressSet={isShippingAddressSet}
        searchParams={searchParams}
        cart={cart as BaseCartFragment}
      />
      <StaticPageContent url="/cart/checkout" />
    </Suspense>
  );
}
