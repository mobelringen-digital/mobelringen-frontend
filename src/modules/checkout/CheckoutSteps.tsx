"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { CartCookie } from "@/components/cart/fetchCartService";
import { CheckoutBlock } from "@/modules/checkout/CheckoutBlock";
import { ContactFormController } from "@/modules/checkout/contact-form/ContactFormController";
import { PaymentFormController } from "@/modules/checkout/payment/PaymentFormController";
import { ShippingFormController } from "@/modules/checkout/shipping/ShippingFormController";
import { CustomerQuery } from "@/types";

type Blocks = "contact" | "shipping" | "payment";

interface Props {
  isShippingAddressSet: boolean;
  isShippingMethodSet: boolean;
  customer?: CustomerQuery;
}

export const CheckoutSteps: React.FC<Props> = ({
  isShippingAddressSet,
  isShippingMethodSet,
  customer,
}) => {
  const [cookies] = useCookies<"preferredMethod", CartCookie>([
    "preferredMethod",
  ]);
  const isOnlineMethod = cookies.preferredMethod === "online";
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
            customer={customer}
            onSuccessfulSubmit={() => setActiveBlock("shipping")}
          />
        }
      />
      {isOnlineMethod ? (
        <>
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
        </>
      ) : null}
    </div>
  );
};
