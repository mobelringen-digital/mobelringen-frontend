import React from "react";

import { CartPricing } from "@/components/cart/CartPricing";
import { CartProceedButton } from "@/modules/cart/cart-price/CartProceedButton";
import { CartPriceFragment } from "@/types";

interface Props {
  prices?: CartPriceFragment | null;
  checkoutDisabled?: boolean;
}

export const CartPrice: React.FC<Props> = ({ prices, checkoutDisabled }) => {
  if (!prices) return null;

  return (
    <div className="col-span-12 lg:col-span-5">
      <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-6">
        <h4 className="text-xl font-semibold">Oppsummering</h4>
        <div className="flex flex-col gap-4">
          <CartPricing />
          <CartProceedButton disabled={checkoutDisabled} />
        </div>
      </div>
    </div>
  );
};
