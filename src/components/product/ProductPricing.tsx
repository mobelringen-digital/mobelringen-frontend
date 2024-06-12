import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { ProductPriceRangeFragment } from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  priceRange: ProductPriceRangeFragment;
}

export const ProductPricing: React.FC<Props> = ({ priceRange }) => {
  const { amountDiscount, finalPrice, originalPrice, currency } =
    usePriceRange(priceRange);

  return (
    <div className="mt-2 text-xs lg:text-base font-semibold flex items-center">
      {amountDiscount ? (
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-4">
          <div className="text-red">
            <FormatNumber
              value={finalPrice}
              format="currency"
              suffix={currency}
            />
          </div>

          <div className="text-dark-grey line-through">
            <FormatNumber
              value={originalPrice}
              format="currency"
              suffix={currency}
            />
          </div>
        </div>
      ) : (
        <div className="mt-2 font-semibold flex items-center">
          <div className="text-black">
            <FormatNumber
              value={finalPrice}
              format="currency"
              suffix={currency}
            />
          </div>
        </div>
      )}
    </div>
  );
};
