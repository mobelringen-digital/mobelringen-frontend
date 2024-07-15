"use client";

import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CheckoutBreadcrumbs } from "@/modules/checkout/CheckoutBreadcrumbs";
import { CheckoutTitle } from "@/modules/checkout/CheckoutTitle";

export const CheckoutPage = () => {
  const [isEnabled] = React.useState(false);

  if (!isEnabled) {
    return null;
  }

  return (
    <ContainerLayout>
      <CheckoutBreadcrumbs />
      <CheckoutTitle />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white flex flex-col gap-6 rounded-2xl p-4 lg:p-8">
            Checkout
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">Side</div>
      </div>
    </ContainerLayout>
  );
};
