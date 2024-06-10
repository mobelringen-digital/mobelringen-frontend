import React from "react";

import cx from "classnames";

interface Props {
  variant: keyof typeof VARIANTS;
  className?: string;
}

const VARIANTS = {
  green: "bg-success",
  red: "bg-error",
};

export const StatusCircle: React.FC<Props> = ({ variant, className }) => {
  return (
    <div className={cx("w-3 h-3 rounded-full", VARIANTS[variant], className)} />
  );
};
