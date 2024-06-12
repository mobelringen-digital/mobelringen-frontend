"use client";

import React from "react";

import { Input, InputProps } from "@nextui-org/input";

import { MinusIcon } from "@/components/_ui/icons/MinusIcon";
import { PlusIcon } from "@/components/_ui/icons/PlusIcon";
import { QuantityButton } from "@/components/_ui/quantity-input/QuantityButton";

interface Props extends InputProps {
  onQuantityIncrement?: () => void;
  onQuantityDecrement?: () => void;
}

export const QuantityInput: React.FC<Props> = ({
  onQuantityIncrement,
  onQuantityDecrement,
  onChange,
  ...rest
}) => {
  return (
    <div className="rounded-2xl bg-sand flex items-center px-2 py-1">
      <QuantityButton onClick={onQuantityDecrement}>
        <MinusIcon width={24} height={24} />
      </QuantityButton>
      <Input
        {...rest}
        className="flex w-10 flex-row justify-center"
        onChange={(e) => {
          if (isNaN(parseInt(e.target.value, 10))) {
            return;
          }
          onChange?.(e);
        }}
        classNames={{
          input: "bg-sand p-0 w-10 text-center border-0 text-sm font-semibold",
          inputWrapper: "bg-sand p-0 w-10",
          mainWrapper: "bg-sand p-0 w-10r",
        }}
      />
      <QuantityButton onClick={onQuantityIncrement}>
        <PlusIcon width={24} height={24} />
      </QuantityButton>
    </div>
  );
};
