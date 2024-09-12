"use client";

import React from "react";

import { RadioGroup } from "@nextui-org/radio";

import { Button } from "@/components/_ui/button/Button";
import { KlarnaIcon } from "@/components/_ui/icons/figma/KlarnaIcon";
import { VippsIcon } from "@/components/_ui/icons/figma/VippsIcon";
import { VisaIcon } from "@/components/_ui/icons/figma/VisaIcon";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { AvailablePaymentMethodFragment, BaseCartFragment } from "@/types";

interface Props {
  cart: BaseCartFragment;
  onSubmit: (method: AvailablePaymentMethodFragment) => Promise<void>;
}

const ICONS: Record<string, React.ReactNode> = {
  checkmo: <VisaIcon />,
  klarna_kco: <KlarnaIcon />,
  vipps: <VippsIcon />,
} as const;

export const PaymentForm: React.FC<Props> = ({ cart, onSubmit }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState<
    AvailablePaymentMethodFragment["code"] | null
  >(cart.selected_payment_method?.code ?? null);

  const handleSelect = () => {
    setIsLoading(true);
    if (!selectedMethod) {
      return;
    }

    const method = cart.available_payment_methods?.find(
      (m) => m?.code === selectedMethod,
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
            color="primary"
            value={selectedMethod}
            onValueChange={setSelectedMethod}
          >
            {cart.available_payment_methods?.map((method) => (
              <RadioBlock key={method?.code} value={method?.code ?? ""}>
                <div className="flex w-full justify-between items-center gap-2 items.center">
                  <span className="text-sm lg:text-base font-semibold">
                    {method?.title} {method?.code}
                  </span>
                  {method?.code.includes("klarna") ? ICONS["klarna_kco"] : null}
                  {method?.code.includes("vipps") ? ICONS["vipps"] : null}
                </div>
              </RadioBlock>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="col-span-12 flex justify-end mt-6">
        <Button
          onClick={handleSelect}
          color="tertiary"
          type="submit"
          disabled={!selectedMethod || isLoading}
        >
          Fortsett
        </Button>
      </div>
    </div>
  );
};
