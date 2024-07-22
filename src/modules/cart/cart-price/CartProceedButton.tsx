"use client";

import React from "react";

import { Button } from "@/components/_ui/button/Button";

import { navigate } from "../../../app/actions";

interface Props {
  disabled?: boolean;
}

export const CartProceedButton: React.FC<Props> = ({ disabled }) => {
  const navigateToCheckout = async () => {
    return navigate("/cart/checkout");
  };

  return (
    <Button
      disabled={disabled}
      onClick={navigateToCheckout}
      color="tertiary"
      className="w-full mt-4"
    >
      Fortsett til betaling
    </Button>
  );
};
