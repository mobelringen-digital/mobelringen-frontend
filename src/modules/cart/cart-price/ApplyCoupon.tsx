"use client";

import React from "react";

import { useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { applyCouponToCart } from "@/modules/cart/cart-price/actions";
import { BaseCartFragment } from "@/types";
import { useRequestCallback } from "@/utils/hooks/useRequestCallback";

interface FormData {
  code: string;
}

interface Props {
  cart?: BaseCartFragment | null;
}

export const ApplyCoupon: React.FC<Props> = ({ cart }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();
  const { handlePossibleErrors } = useRequestCallback();

  const applyDiscount = async (data: FormData) => {
    if (!cart?.id) return;
    if (!data.code) return;

    const res = await applyCouponToCart(cart?.id, data.code as string);

    handlePossibleErrors(res);

    return res;
  };

  return (
    <div className="flex flex-col gap-2 pb-4 border-b border-b-cold-grey-dark border-opacity-80">
      <span className="text-sm">Rabattkode</span>
      <form
        onSubmit={handleSubmit(applyDiscount)}
        className="flex gap-6 w-full items-center"
      >
        <FieldWrapper
          className="w-full"
          rules={{ required: "Dette er et påkrevd felt" }}
          error={errors.code}
          control={control}
          name="code"
        >
          <Input
            className="w-full"
            variant="bordered"
            placeholder="Din rabattkode"
          />
        </FieldWrapper>
        <Button disabled={isSubmitting} type="submit" color="secondary">
          Legg til
        </Button>
      </form>
      {cart?.applied_coupons?.map((coupon) => (
        <div className="bg-success bg-opacity-20 rounded-lg text-center px-2 py-1 text-sm text-success-dark" key={coupon?.code}>
          Rabattkode <span className="font-semibold">{coupon?.code}</span> lagt
          til!
        </div>
      ))}
    </div>
  );
};
