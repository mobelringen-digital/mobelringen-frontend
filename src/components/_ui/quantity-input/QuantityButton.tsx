import React from "react";

import cx from "classnames";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export const QuantityButton: React.FC<Props> = ({
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      aria-label="Quantity button"
      disabled={disabled}
      className={cx(
        "bg-sand w-[36px] h-[36px] flex items-center justify-center z-20",
        { "cursor-not-allowed": disabled },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
