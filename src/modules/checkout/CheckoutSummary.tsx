import React from "react";

import { CartPricing } from "@/components/cart/CartPricing";
import { CartSummaryImage } from "@/modules/checkout/CartSummaryImage";
import { BaseCartFragment } from "@/types";

interface Props {
  cart?: BaseCartFragment | null;
}

export const CheckoutSummary: React.FC<Props> = ({ cart }) => {
  return (
    <div className="bg-white flex flex-col gap-6 rounded-2xl p-4 lg:p-8">
      <div className="flex flex-col gap-2">
        <span className="text-xl text-black font-semibold">Ordreoversikt</span>
        <div className="flex gap-2 mb-6">
          {cart?.items?.map((item) => {
            return <CartSummaryImage key={item?.id} item={item} />;
          })}
        </div>
        <CartPricing cart={cart} />
      </div>
    </div>
  );
};
