import React from "react";

import { CartPricing } from "@/components/cart/CartPricing";
import { CartProceedButton } from "@/modules/cart/cart-price/CartProceedButton";
import { BaseCartFragment, CartPriceFragment } from "@/types";

interface Props {
  prices?: CartPriceFragment | null;
  cart?: BaseCartFragment | null;
}

export const CartPrice: React.FC<Props> = ({ prices, cart }) => {
  if (!prices) return null;

  return (
    <div className="col-span-12 lg:col-span-5">
      <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-6">
        <h4 className="text-xl font-semibold">Oppsummering</h4>
        <div className="flex flex-col gap-4">
          <CartPricing cart={cart} />
          <CartProceedButton cart={cart} />
        </div>
      </div>
    </div>
  );
};
