import React from "react";

import cx from "classnames";

interface Props {
  message: React.ReactNode;
  type?: keyof typeof COLORS;
}

const COLORS = {
  red: "bg-error-light text-error",
  yellow: "bg-warning-light text-warning-dark",
};

export const CartWarning: React.FC<Props> = ({ message, type = "red" }) => {
  return (
    <span
      className={cx(
        "rounded-xl text-center w-full py-1 px-4 text-xs lg:text-sm",
        COLORS[type],
      )}
    >
      {message}
    </span>
  );
};
