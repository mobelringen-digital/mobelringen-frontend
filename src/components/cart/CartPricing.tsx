import React from "react";

import getCart from "@/components/cart/actions";
import { CartPriceLine } from "@/modules/cart/cart-price/CartPriceLine";
import { BaseCartFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
}

export async function CartPricing({ cart }: Props) {
  const prices = cart?.prices;

  const pricingLines = () => {
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
  };

  return (
    <>
      <div className="flex flex-col gap-2 pb-4 border-b border-b-cold-grey-dark border-opacity-80">
        <CartPriceLine
          label="Produkter"
          value={pricingLines().subtotal.value}
          currency={pricingLines().subtotal.currency}
        />

        {pricingLines().totalDiscount.value ? (
          <CartPriceLine
            priceClassName="text-red"
            label="Rabatter"
            value={pricingLines().totalDiscount.value}
            currency={pricingLines().totalDiscount.currency}
            isDiscount={true}
          />
        ) : null}

        {pricingLines().taxes?.map((tax, idx) => (
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
        value={pricingLines().total.value}
        currency={pricingLines().total.currency}
      />
    </>
  );
}
