"use client";

import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CheckoutBlock } from "@/modules/checkout/CheckoutBlock";
import { CheckoutBreadcrumbs } from "@/modules/checkout/CheckoutBreadcrumbs";
import { CheckoutTitle } from "@/modules/checkout/CheckoutTitle";
import { ContactForm } from "@/modules/checkout/contact-form/ContactForm";

type Blocks = "contact" | "shipping" | "payment";

export const CheckoutPage = () => {
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
                <ContactForm
                  onSuccessfulSubmit={() => setActiveBlock("shipping")}
                />
              }
            />
            <CheckoutBlock
              onClick={() => setActiveBlock("shipping")}
              position={2}
              title="Levering"
              isActive={activeBlock === "shipping"}
              content="text"
            />
            <CheckoutBlock
              onClick={() => setActiveBlock("payment")}
              position={3}
              title="Betaling"
              isActive={activeBlock === "payment"}
              content="text"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">Side</div>
      </div>
    </ContainerLayout>
  );
};
