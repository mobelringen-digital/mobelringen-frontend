import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { CartPriceLine } from "@/modules/cart/cart-price/CartPriceLine";
import { CartPriceFragment } from "@/types";

interface Props {
  prices?: CartPriceFragment | null;
}

export const CartPrice: React.FC<Props> = ({ prices }) => {
  const pricingLines = React.useMemo(() => {
    return {
      subtotal: {
        label: "Produkter",
        value: prices?.subtotal_excluding_tax?.value,
        currency: prices?.subtotal_excluding_tax?.currency,
      },
      taxes: prices?.applied_taxes?.map((tax) => ({
        label: tax?.label,
        value: tax?.amount.value,
        currency: tax?.amount.currency,
      })),
      total: {
        label: "Total",
        value: prices?.grand_total?.value,
        currency: prices?.grand_total?.currency,
      },
    };
  }, [prices]);

  if (!prices) return null;

  return (
    <>
      <h4 className="text-xl font-semibold">Oppsummering</h4>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 pb-4 border-b border-b-cold-grey-dark border-opacity-80">
          <CartPriceLine
            label="Produkter"
            value={pricingLines.subtotal.value}
            currency={pricingLines.subtotal.currency}
          />
          {pricingLines.taxes?.map((tax, idx) => (
            <CartPriceLine
              key={idx}
              label={tax.label ?? ""}
              value={tax.value}
              currency={tax.currency}
            />
          ))}
        </div>
        <CartPriceLine
          labelClassName="font-semibold"
          label="Total"
          value={pricingLines.total.value}
          currency={pricingLines.total.currency}
        />
        <Button color="tertiary" className="w-full mt-4">
          Fortsett til betaling
        </Button>
      </div>
    </>
  );
};
