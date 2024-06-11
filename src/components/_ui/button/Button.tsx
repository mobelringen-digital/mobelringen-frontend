import React from "react";

import { Button as NextUIButton } from "@nextui-org/button";
import { ButtonProps } from "@nextui-org/react";
import cx from "classnames";

interface Props extends Omit<ButtonProps, "color"> {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
}

const COLORS = {
  primary: "bg-red text-black",
  secondary: "bg-powder text-black",
  tertiary: "bg-black text-white",
} as const;

export const Button: React.FC<Props> = ({
  children,
  color = "primary",
  disabled,
  ...rest
}) => {
  return (
    <NextUIButton
      className={cx("rounded-2xl py-2 px-6 lg:px-8", COLORS[color], {
        "bg-cold-grey-dark text-dark-grey cursor-not-allowed": disabled,
      })}
      {...rest}
    >
      {children}
    </NextUIButton>
  );
};
