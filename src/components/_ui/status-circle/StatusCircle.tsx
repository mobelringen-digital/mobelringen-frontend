import React from "react";

import cx from "classnames";

interface Props {
  variant: keyof typeof VARIANTS;
  size?: keyof typeof SIZINGS;
  className?: string;
}

const VARIANTS = {
  green: "bg-success",
  red: "bg-error",
  yellow: "bg-[#FFBA07]",
  "green-circle": "bg-white border-2 border-success",
};

const SIZINGS = {
  small: "w-2 h-2",
  medium: "w-3 h-3",
  large: "w-4 h-4",
};

export const StatusCircle: React.FC<Props> = ({
  variant,
  className,
  size = "medium",
}) => {
  return (
    <div
      className={cx(
        "rounded-full flex-shrink-0",
        VARIANTS[variant],
        SIZINGS[size],
        className,
      )}
    />
  );
};
