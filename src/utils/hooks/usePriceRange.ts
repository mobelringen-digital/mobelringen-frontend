import React from "react";

import { ProductPriceRangeFragment } from "@/types";

export const usePriceRange = (
  priceRange?: ProductPriceRangeFragment | null,
) => {
  const singlePricingUsed =
    priceRange?.minimum_price?.regular_price?.value ===
    priceRange?.maximum_price?.regular_price?.value;
  const isPercentDiscount = singlePricingUsed
    ? priceRange?.minimum_price?.discount?.percent_off
    : priceRange?.minimum_price?.discount?.percent_off !==
      priceRange?.maximum_price?.discount?.percent_off;

  const price = React.useMemo(() => {
    if (singlePricingUsed) {
      return `${priceRange?.minimum_price?.regular_price?.value}${priceRange?.minimum_price?.regular_price?.currency}`;
    }

    return `${priceRange?.minimum_price?.regular_price?.value}${priceRange?.minimum_price?.regular_price?.currency} - ${priceRange?.maximum_price?.regular_price?.value}${priceRange?.maximum_price?.regular_price?.currency}`;
  }, [priceRange, singlePricingUsed]);

  const discount = React.useMemo(() => {
    if (
      !priceRange?.minimum_price?.discount?.percent_off &&
      !priceRange?.minimum_price?.discount?.amount_off
    ) {
      return null;
    }

    if (singlePricingUsed && isPercentDiscount) {
      return `- ${priceRange?.minimum_price?.discount?.percent_off} %`;
    }

    if (singlePricingUsed && !isPercentDiscount) {
      return `- ${priceRange?.minimum_price?.discount?.amount_off}${priceRange?.minimum_price?.regular_price?.currency}`;
    }

    return `${priceRange?.minimum_price?.discount?.percent_off} - ${priceRange?.maximum_price?.discount?.percent_off}`;
  }, [priceRange, singlePricingUsed, isPercentDiscount]);

  return {
    price,
    discount,
  };
};
