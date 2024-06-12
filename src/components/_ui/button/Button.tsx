import React from "react";

import { Button as NextUIButton } from "@nextui-org/button";
import { ButtonProps } from "@nextui-org/react";
import cx from "classnames";

interface Props extends Omit<ButtonProps, "color"> {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
}

const COLORS = {
  primary: "bg-red text-black hover:bg-blend-darken",
  secondary: "bg-powder text-black hover:bg-blend-darken",
  tertiary: "bg-black text-white  hover:bg-blend-lighten",
} as const;

export const Button: React.FC<Props> = ({
  children,
  color = "primary",
  disabled,
  ...rest
}) => {
  return (
    <NextUIButton
      className={cx("rounded-full py-6 px-6 lg:px-8 text-base", COLORS[color], {
        "bg-cold-grey-dark text-dark-grey cursor-not-allowed": disabled,
      })}
      {...rest}
    >
      {children}
    </NextUIButton>
  );
};
