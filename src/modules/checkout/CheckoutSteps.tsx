"use client";

import React from "react";

import { CheckoutBlock } from "@/modules/checkout/CheckoutBlock";
import { ContactFormController } from "@/modules/checkout/contact-form/ContactFormController";
import { PaymentFormController } from "@/modules/checkout/payment/PaymentFormController";
import { ShippingFormController } from "@/modules/checkout/shipping/ShippingFormController";

type Blocks = "contact" | "shipping" | "payment";

interface Props {
  isShippingAddressSet: boolean;
  isShippingMethodSet: boolean;
}

export const CheckoutSteps: React.FC<Props> = ({
  isShippingAddressSet,
  isShippingMethodSet,
}) => {
  const [activeBlock, setActiveBlock] = React.useState<Blocks>("contact");

  return (
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
        disabled={!isShippingAddressSet}
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
        disabled={!isShippingMethodSet}
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
  );
};
