import React from "react";

import { cookies } from "next/headers";

import { CheckoutBlock } from "@/modules/checkout/CheckoutBlock";
import { ContactFormController } from "@/modules/checkout/contact-form/ContactFormController";
import { PaymentFormController } from "@/modules/checkout/payment/PaymentFormController";
import { ShippingFormController } from "@/modules/checkout/shipping/ShippingFormController";
import { BaseCartFragment, CustomerDataFragment, DeliveryType } from "@/types";
import { NextSearchParams } from "@/utils/ts-utils";

export type Blocks = "contact" | "shipping" | "payment";

interface Props {
  isShippingAddressSet: boolean;
  isShippingMethodSet: boolean;
  customer?: CustomerDataFragment | null;
  cart?: BaseCartFragment | null;
  searchParams?: Promise<NextSearchParams>;
}

export async function CheckoutSteps({
  isShippingAddressSet,
  isShippingMethodSet,
  customer,
  cart,
  ...rest
}: Props) {
  const searchParams = await rest.searchParams;
  const cookiesStore = await cookies();
  const isOnlineMethod =
    cookiesStore.get("preferredMethod")?.value !== DeliveryType.Cac;
  const isClickAndCollect =
    cookiesStore.get("preferredMethod")?.value === DeliveryType.Cac;

  return (
    <div className="flex flex-col gap-6">
      <CheckoutBlock
        position={1}
        type="contact"
        title="Kontaktopplysninger"
        isActive={!searchParams?.step || searchParams?.step === "contact"}
        content={
          <ContactFormController
            isClickAndCollect={isClickAndCollect}
            cart={cart}
            customer={customer}
          />
        }
      />
      {isOnlineMethod ? (
        <>
          <CheckoutBlock
            disabled={!isShippingAddressSet}
            position={2}
            type="shipping"
            title="Levering"
            isActive={searchParams?.step === "shipping"}
            content={<ShippingFormController cart={cart} />}
          />
          <CheckoutBlock
            disabled={!isShippingMethodSet}
            position={3}
            type="payment"
            title="Betaling"
            isActive={searchParams?.step === "payment"}
            content={<PaymentFormController cart={cart} />}
          />
        </>
      ) : null}
    </div>
  );
}
