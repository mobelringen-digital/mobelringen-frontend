"use client";

import React from "react";

import { useCartQuery } from "@/components/cart/useCartQuery";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CheckoutBlock } from "@/modules/checkout/CheckoutBlock";
import { CheckoutBreadcrumbs } from "@/modules/checkout/CheckoutBreadcrumbs";
import { CheckoutSummary } from "@/modules/checkout/CheckoutSummary";
import { CheckoutTitle } from "@/modules/checkout/CheckoutTitle";
import { ContactFormController } from "@/modules/checkout/contact-form/ContactFormController";
import { PaymentFormController } from "@/modules/checkout/payment/PaymentFormController";
import { ShippingFormController } from "@/modules/checkout/shipping/ShippingFormController";

type Blocks = "contact" | "shipping" | "payment";

export const CheckoutPage = () => {
  const { data: cart } = useCartQuery();
  const [activeBlock, setActiveBlock] = React.useState<Blocks>("contact");

  return (
    <ContainerLayout>
      <CheckoutBreadcrumbs />
      <CheckoutTitle />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="flex flex-col gap-6">
            <CheckoutBlock
              onClick={() => setActiveBlock("contact")}
              position={1}
              title="Kontaktopplysninger"
              isActive={activeBlock === "contact"}
              content={
                <ContactFormController
                  onSuccessfulSubmit={() => setActiveBlock("shipping")}
                />
              }
            />
            <CheckoutBlock
              disabled={false}
              onClick={() => setActiveBlock("shipping")}
              position={2}
              title="Levering"
              isActive={activeBlock === "shipping"}
              content={
                <ShippingFormController
                  onSuccessfulSubmit={() => setActiveBlock("payment")}
                />
              }
            />
            <CheckoutBlock
              onClick={() => setActiveBlock("payment")}
              position={3}
              title="Betaling"
              isActive={activeBlock === "payment"}
              content={
                <PaymentFormController
                  onSuccessfulSubmit={() => setActiveBlock("payment")}
                />
              }
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <CheckoutSummary />
        </div>
      </div>
      <Debugger data={cart} />
    </ContainerLayout>
  );
};
