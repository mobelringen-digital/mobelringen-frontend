import React from "react";

import { ApplyCoupon } from "@/modules/cart/cart-price/ApplyCoupon";
import { CartPriceLine } from "@/modules/cart/cart-price/CartPriceLine";
import { BaseCartFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
  showApplyCoupon?: boolean;
}

export async function CartPricing({ cart, showApplyCoupon }: Props) {
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
      discounts: prices?.discounts?.map((tax) => ({
        label: tax?.label,
        value: tax?.amount.value,
        currency: tax?.amount.currency,
      })),
      delivery: {
        label:
          cart?.shipping_addresses?.[0]?.selected_shipping_method?.method_title,
        value:
          cart?.shipping_addresses?.[0]?.selected_shipping_method?.amount
            ?.value,
        currency:
          cart?.shipping_addresses?.[0]?.selected_shipping_method?.amount
            .currency,
      },
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

        {pricingLines().discounts?.map((tax, idx) => (
          <CartPriceLine
            key={idx}
            label={tax.label ?? ""}
            value={tax.value}
            currency={tax.currency}
          />
        ))}

        {pricingLines().delivery.value ? (
          <CartPriceLine
            label={pricingLines().delivery.label ?? ""}
            value={pricingLines().delivery.value}
            currency={pricingLines().delivery.currency}
          />
        ) : null}
      </div>

      {showApplyCoupon ? <ApplyCoupon cart={cart} /> : null}

      <CartPriceLine
        labelClassName="font-semibold"
        label="Total"
        value={pricingLines().total.value}
        currency={pricingLines().total.currency}
      />

      {pricingLines().delivery.value ? (
        <span className="text-dark-grey mt-2 text-sm">
          {
            cart?.shipping_addresses?.[0]?.selected_shipping_method
              ?.carrier_title
          }
        </span>
      ) : null}
    </>
  );
}
