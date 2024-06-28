import React from "react";

import cx from "classnames";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";

interface Props {
  label: string;
  value?: number | null;
  currency?: string | null;
  labelClassName?: string;
}

export const CartPriceLine: React.FC<Props> = ({
  label,
  labelClassName,
  value,
  currency,
}) => {
  return (
    <div className="flex justify-between">
      <span className={cx("text-sm", labelClassName)}>{label}</span>
      <span className="font-semibold text-sm">
        <FormatNumber
          value={value}
          format="currency"
          suffix={String(currency)}
        />
      </span>
    </div>
  );
};
