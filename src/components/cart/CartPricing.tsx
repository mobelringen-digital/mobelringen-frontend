import React from "react";

import { CartPriceLine } from "@/modules/cart/cart-price/CartPriceLine";
import { useCart } from "@/modules/cart/hooks/useCart";

export const CartPricing = () => {
  const { pricingLines } = useCart();

  return (
    <>
      <div className="flex flex-col gap-2 pb-4 border-b border-b-cold-grey-dark border-opacity-80">
        <CartPriceLine
          label="Produkter"
          value={pricingLines.subtotal.value}
          currency={pricingLines.subtotal.currency}
        />

        {pricingLines.totalDiscount.value ? (
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
    </>
  );
};
