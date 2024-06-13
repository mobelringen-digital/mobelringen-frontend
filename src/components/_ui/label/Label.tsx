import React from "react";

import cx from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant: keyof typeof VARIANT;
}

const VARIANT = {
  black: "bg-black text-white",
  powder: "bg-powder-dark text-black",
};

export const Label: React.FC<Props> = ({
  children,
  variant = "black",
  className,
}) => {
  return (
    <span
      className={cx(
        "py-1 px-2 font-semibold uppercase text-[10px] rounded-xl",
        VARIANT[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
