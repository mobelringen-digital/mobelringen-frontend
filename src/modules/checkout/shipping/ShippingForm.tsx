import React from "react";

import { RadioGroup } from "@nextui-org/radio";

import { Button } from "@/components/_ui/button/Button";
import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { AvailableShippingMethodFragment, BaseCartFragment } from "@/types";

interface Props {
  cart: BaseCartFragment;
  onSubmit: (method: AvailableShippingMethodFragment) => void;
}

export const ShippingForm: React.FC<Props> = ({ cart, onSubmit }) => {
  const [selectedMethod, setSelectedMethod] =
    React.useState<AvailableShippingMethodFragment | null>(null);

  const handleSelect = () => {
    if (!selectedMethod) {
      return;
    }

    return onSubmit(selectedMethod);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <RadioGroup color="primary">
            {cart.shipping_addresses[0]?.available_shipping_methods?.map(
              (method) => (
                <RadioBlock
                  key={method?.method_code}
                  value={method?.method_code ?? ""}
                  checked={selectedMethod === method}
                  onClick={() => setSelectedMethod(method)}
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

      <div className="col-span-12 flex justify-end mt-6">
        <Button
          onClick={handleSelect}
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
