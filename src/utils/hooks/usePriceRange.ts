import React from "react";

import { ProductPriceRangeFragment } from "@/types";

export const usePriceRange = (
  priceRange?: ProductPriceRangeFragment | null,
) => {
  const currency = priceRange?.minimum_price?.final_price?.currency ?? "";

  const originalPrice = React.useMemo(() => {
    return priceRange?.minimum_price?.regular_price?.value;
  }, [priceRange?.minimum_price?.regular_price?.value]);

  const finalPrice = React.useMemo(() => {
    return priceRange?.minimum_price?.final_price?.value;
  }, [priceRange?.minimum_price?.final_price?.value]);

  const percentageDiscount = React.useMemo(() => {
    const percentOff = priceRange?.minimum_price?.discount?.percent_off;

    if (percentOff) {
      return `-${Math.round(percentOff)} %`;
    }

    return null;
  }, [priceRange]);

  const amountDiscount = React.useMemo(() => {
    const amountOff = priceRange?.minimum_price?.discount?.amount_off;

    if (amountOff) {
      return `-${amountOff}${currency}`;
    }

    return null;
  }, [priceRange, currency]);

  return {
    originalPrice,
    finalPrice,
    percentageDiscount,
    amountDiscount,
    currency,
  };
};
