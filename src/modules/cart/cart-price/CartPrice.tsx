import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { CartPricing } from "@/components/cart/CartPricing";
import { CartPriceFragment } from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  prices?: CartPriceFragment | null;
  checkoutDisabled?: boolean;
}

export const CartPrice: React.FC<Props> = ({ prices, checkoutDisabled }) => {
  const navigateToCheckout = async () => {
    return navigate("/cart/checkout");
  };

  if (!prices) return null;

  return (
    <div className="col-span-12 lg:col-span-5">
      <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-6">
        <h4 className="text-xl font-semibold">Oppsummering</h4>
        <div className="flex flex-col gap-4">
          <CartPricing />
          <Button
            disabled={checkoutDisabled}
            onClick={navigateToCheckout}
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
