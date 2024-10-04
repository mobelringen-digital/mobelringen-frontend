"use client";

import React from "react";

import { Input, InputProps } from "@nextui-org/input";

import { MinusIcon } from "@/components/_ui/icons/MinusIcon";
import { PlusIcon } from "@/components/_ui/icons/PlusIcon";
import { QuantityButton } from "@/components/_ui/quantity-input/QuantityButton";

interface Props extends InputProps {
  onQuantityIncrement?: () => void;
  onQuantityDecrement?: () => void;
  disabled?: boolean;
}

export const QuantityInput: React.FC<Props> = ({
  onQuantityIncrement,
  onQuantityDecrement,
  disabled,
  onChange,
  ...rest
}) => {
  const handleQuantityIncrease = () => {
    onQuantityIncrement?.();
  };
  return (
    <div className="rounded-2xl w-[120px] bg-sand flex items-center px-2 py-1">
      <Input
        {...rest}
        disabled={disabled}
        startContent={
          <QuantityButton onClick={onQuantityDecrement} disabled={disabled}>
            <MinusIcon width={24} height={24} />
          </QuantityButton>
        }
        className="flex flex-row justify-center"
        onChange={(e) => {
          if (isNaN(parseInt(e.target.value, 10))) {
            return;
          }
          onChange?.(e);
        }}
        classNames={{
          input: "bg-sand p-0 text-center border-0 text-sm font-semibold",
          inputWrapper: "bg-sand p-0 shadow-none",
          mainWrapper: "bg-sand p-0",
        }}
        endContent={
          <QuantityButton onClick={handleQuantityIncrease} disabled={disabled}>
            <PlusIcon width={24} height={24} />
          </QuantityButton>
        }
      />
    </div>
  );
};
