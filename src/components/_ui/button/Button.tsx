"use client";

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
  tertiary: "bg-black text-white hover:bg-dark-grey hover:text-white",
  grey: "bg-warm-grey text-dark-grey hover:bg-cold-grey-dark",
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
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = (e: any) => {
    if (disabled) {
      return;
    }

    return rest.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick(e);
    }
    if (e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <NextUIButton
      ref={buttonRef}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={cx(
        "rounded-full py-6 px-6 lg:px-8 text-sm lg:text-base",
        className,
        COLORS[color],
        VARIANTS[variant],
        {
          "bg-cold-grey-dark text-dark-grey cursor-not-allowed hover:bg-cold-grey-dark":
            disabled,
        },
      )}
      {...rest}
    >
      {children}
    </NextUIButton>
  );
};
