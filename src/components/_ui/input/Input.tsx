import React from "react";

import {
  Input as NextUiInput,
  InputProps as NextUiInputProps,
} from "@nextui-org/input";

export interface InputProps extends Omit<NextUiInputProps, "variant"> {
  variant?: keyof typeof VARIANTS;
}

const VARIANTS = {
  bordered: {
    input: "text-normal rounded-md text-base",
    inputWrapper: "bg-white rounded-md h-[45px",
    mainWrapper: "border border-grey rounded-md",
  },
  filled: {
    input: "bg-sand border-0 py-2 text-sm rounded-2xl text-base",
    inputWrapper: "bg-sand rounded-2xl",
    mainWrapper: "bg-white rounded-2xl",
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ variant = "filled", ...rest }, ref) {
    return <NextUiInput ref={ref} classNames={VARIANTS[variant]} {...rest} />;
  },
);

Input.displayName = "Input";
