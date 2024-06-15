import React from "react";

import { Input as NextUiInput, InputProps } from "@nextui-org/input";

interface Props extends Omit<InputProps, "variant"> {
  variant?: keyof typeof VARIANTS;
}

const VARIANTS = {
  bordered: {
    input: "text-normal rounded-md",
    inputWrapper: "bg-white rounded-md",
    mainWrapper: "border border-grey rounded-md",
  },
  filled: {
    input: "bg-sand border-0 py-2 text-sm rounded-2xl",
    inputWrapper: "bg-sand rounded-2xl",
    mainWrapper: "bg-white rounded-2xl",
  },
};

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { variant = "filled", ...rest },
  ref,
) {
  return <NextUiInput ref={ref} classNames={VARIANTS[variant]} {...rest} />;
});

Input.displayName = "Input";
