import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { CartPriceLine } from "@/modules/cart/cart-price/CartPriceLine";
import { CartPriceFragment } from "@/types";

interface Props {
  prices?: CartPriceFragment | null;
  checkoutDisabled?: boolean;
}

export const CartPrice: React.FC<Props> = ({ prices, checkoutDisabled }) => {
  const pricingLines = React.useMemo(() => {
    return {
      subtotal: {
        label: "Produkter",
        value: prices?.items_grand_total_base_price?.value,
        currency: prices?.items_grand_total_base_price?.currency,
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
      totalDiscount: {
        label: "Rabatter",
        value: prices?.grand_total_special_price_diff.value,
        currency: prices?.grand_total_special_price_diff.currency,
      },
    };
  }, [prices]);

  if (!prices) return null;

  return (
    <div className="col-span-12 lg:col-span-5">
      <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-6">
        <h4 className="text-xl font-semibold">Oppsummering</h4>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 pb-4 border-b border-b-cold-grey-dark border-opacity-80">
            <CartPriceLine
              label="Produkter"
              value={pricingLines.subtotal.value}
              currency={pricingLines.subtotal.currency}
            />

            {prices.is_special_price ? (
              <CartPriceLine
                priceClassName="text-red"
                label="Rabatter"
                value={pricingLines.totalDiscount.value}
                currency={pricingLines.totalDiscount.currency}
                isDiscount={true}
              />
            ) : null}

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
          <Button
            disabled={checkoutDisabled}
            color="tertiary"
            className="w-full mt-4"
          >
            Fortsett til betaling
          </Button>
        </div>
      </div>
    </div>
  );
};
