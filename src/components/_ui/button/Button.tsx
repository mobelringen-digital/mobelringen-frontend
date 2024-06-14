import React from "react";

import { Button as NextUIButton } from "@nextui-org/button";
import { ButtonProps } from "@nextui-org/react";
import cx from "classnames";

interface Props extends Omit<ButtonProps, "color" | "variant"> {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
  variant?: keyof typeof VARIANTS;
}

const COLORS = {
  primary:
    "bg-red text-black hover:bg-blend-darken hover:bg-dark-red hover:text-white",
  secondary: "bg-powder text-black hover:bg-blend-darken hover:bg-powder-dark",
  tertiary: "bg-black text-white  hover:bg-blend-lighten",
} as const;

const VARIANTS = {
  default: "",
  bordered: "border border-black",
} as const;

export const Button: React.FC<Props> = ({
  children,
  color = "primary",
  variant = "default",
  className,
  disabled,
  ...rest
}) => {
  return (
    <NextUIButton
      className={cx(
        "rounded-full py-6 px-6 lg:px-8 text-base",
        className,
        COLORS[color],
        VARIANTS[variant],
        {
          "bg-cold-grey-dark text-dark-grey cursor-not-allowed": disabled,
        },
      )}
      {...rest}
    >
      {children}
    </NextUIButton>
  );
};
