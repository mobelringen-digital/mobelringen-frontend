import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { CartItemFragment } from "@/types";

interface Props {
  item: CartItemFragment | null;
}

export const CartItemPrice: React.FC<Props> = ({ item }) => {
  if (!item) return null;

  if (item.prices?.is_special_price) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-red">
          <FormatNumber
            value={item.prices?.price_including_tax.value}
            format="currency"
            suffix={item.prices?.price_including_tax.currency ?? "NOK"}
          />
        </span>
        <span className="line-through text-black">
          <FormatNumber
            value={item.prices?.base_price.value}
            format="currency"
            suffix={item.prices?.base_price.currency ?? "NOK"}
          />
        </span>
      </div>
    );
  }

  return (
    <FormatNumber
      value={item?.prices?.row_total_including_tax.value}
      format="currency"
      suffix={item.prices?.row_total_including_tax.currency ?? "NOK"}
    />
  );
};
