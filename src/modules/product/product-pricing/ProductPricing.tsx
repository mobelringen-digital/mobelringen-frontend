import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { ProductPriceRangeFragment } from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  pricingRange?: ProductPriceRangeFragment;
}

export const ProductPricing: React.FC<Props> = ({ pricingRange }) => {
  const { finalPrice, originalPrice, amountDiscount, currency } =
    usePriceRange(pricingRange);

  if (amountDiscount) {
    return (
      <div className="flex flex-col">
        <div className="text-xl text-red font-semibold">
          <FormatNumber
            value={finalPrice}
            format="currency"
            suffix={currency}
          />
        </div>
        <div className="text-sm">
          <span className="mr-1">Førpris:</span>
          <span className="line-through">
            <FormatNumber
              value={originalPrice}
              format="currency"
              suffix={currency}
            />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-xl font-semibold mt-4">
      <FormatNumber value={finalPrice} format="currency" suffix={currency} />
    </div>
  );
};
