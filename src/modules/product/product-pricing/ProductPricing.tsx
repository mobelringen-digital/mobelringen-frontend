"use client";

import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { Info } from "@/components/_ui/icons/figma/Info";
import { BaseProductFragment } from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  product?: BaseProductFragment;
}

export const ProductPricing: React.FC<Props> = ({ product }) => {
  const [open, setOpen] = React.useState(false);
  const pricingRange = product?.price_range;
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
          <div className="flex">
            <span className="mr-1">Førpris:</span>

            <div className="flex gap-2">
              <span className="line-through">
                <FormatNumber
                  value={originalPrice}
                  format="currency"
                  suffix={currency}
                />
              </span>
              {product?.special_price ? (
                <Popover isOpen={open} triggerType="dialog" placement="top">
                  <PopoverTrigger>
                    <button
                      aria-labelledby="Product pricing popover"
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                    >
                      <Info />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-lg">
                    <div className="px-1 py-2">
                      Førprisen er den laveste prisen denne varen har vært
                      markedsført til i løpet av de siste 30 dagene før
                      kampanjestart. Lokale prisvariasjoner kan forekomme.
                    </div>
                  </PopoverContent>
                </Popover>
              ) : null}
            </div>
          </div>
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
