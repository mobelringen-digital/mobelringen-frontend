"use client";

import React from "react";

import { RadioGroup } from "@nextui-org/radio";

import { Button } from "@/components/_ui/button/Button";
import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { AvailableShippingMethodFragment, BaseCartFragment } from "@/types";

interface Props {
  cart: BaseCartFragment;
  onSubmit: (method: AvailableShippingMethodFragment) => Promise<void>;
  onBack: () => void;
}

export const ShippingForm: React.FC<Props> = ({ cart, onSubmit, onBack }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState<
    AvailableShippingMethodFragment["method_code"] | null
  >(cart.shipping_addresses[0]?.selected_shipping_method?.method_code ?? null);

  const handleSelect = () => {
    setIsLoading(true);
    if (!selectedMethod) {
      return;
    }

    const method = cart.shipping_addresses[0]?.available_shipping_methods?.find(
      (m) => m?.method_code === selectedMethod,
    );

    if (!method) return;

    return onSubmit(method).finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col">
      {isLoading ? <PageTopLoader /> : null}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <RadioGroup
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            color="primary"
          >
            {cart.shipping_addresses[0]?.available_shipping_methods?.map(
              (method) => (
                <RadioBlock
                  key={method?.method_code}
                  value={method?.method_code ?? ""}
                  checked={selectedMethod === method?.method_code}
                >
                  <div className="flex flex-col gap-2">
                    <b>{method?.method_title}</b>
                    <span className="text-sm">{method?.carrier_title}</span>
                    <div className="text-dark-grey font-semibold">
                      <FormatNumber
                        value={method?.price_incl_tax.value}
                        format="currency"
                        suffix={method?.price_incl_tax.currency ?? "NOK"}
                      />
                    </div>
                  </div>
                </RadioBlock>
              ),
            )}
          </RadioGroup>
        </div>
      </div>

      <div className="col-span-12 flex justify-end mt-6 gap-2">
        <Button
          aria-label="Tilbake"
          color="secondary"
          type="button"
          onPress={onBack}
        >
          Tilbake
        </Button>
        <Button
          aria-label="Fortsett"
          onPress={handleSelect}
          color="tertiary"
          type="submit"
          disabled={!selectedMethod}
        >
          Fortsett
        </Button>
      </div>
    </div>
  );
};
