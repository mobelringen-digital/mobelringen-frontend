import React from "react";

import cx from "classnames";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";

interface Props {
  label: string;
  value?: number | string | null;
  currency?: string | null;
  labelClassName?: string;
  priceClassName?: string;
  isDiscount?: boolean;
}

export const CartPriceLine: React.FC<Props> = ({
  label,
  labelClassName,
  priceClassName,
  value,
  currency,
  isDiscount,
}) => {
  return (
    <div className="flex justify-between">
      <span className={cx("text-sm", labelClassName)}>{label}</span>
      <span className={cx("font-semibold text-sm", priceClassName)}>
        <FormatNumber
          value={value}
          format="currency"
          suffix={String(currency)}
          prefix={isDiscount ? "- " : undefined}
        />
      </span>
    </div>
  );
};
