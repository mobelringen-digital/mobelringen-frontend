import React from "react";

import Link from "next/link";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { useProductQuery } from "@/components/cms/__components/hotspot/useProductQuery";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  sku: string;
}

const HotspotPopover: React.FC<Props> = ({ sku }) => {
  const { data: product } = useProductQuery(sku);
  const { finalPrice, originalPrice, amountDiscount, currency } = usePriceRange(
    product?.price_range,
  );

  return (
    <Link
      href={`/${product?.canonical_url}`}
      className="absolute w-64 -translate-y-3/4 translate-x-full -top-3/4 -right-0 bg-white p-4 shadow-lg rounded-full rounded-bl-none hover:shadow-xl"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start text-left ml-2">
          <div className="text-md font-semibold">{product?.name}</div>
          <div
            className="text-xs font-normal text-dark-grey"
            dangerouslySetInnerHTML={{
              __html: product?.short_description?.html ?? "",
            }}
          />
          <div className="flex gap-4 mt-2">
            <div className="text-sm">
              <FormatNumber
                value={finalPrice}
                format="currency"
                suffix={currency}
              />
            </div>
            {amountDiscount ? (
              <div className="text-sm line-through text-red">
                <FormatNumber
                  value={originalPrice}
                  format="currency"
                  suffix={currency}
                />
              </div>
            ) : null}
          </div>
        </div>
        <ChevronRight />
      </div>
    </Link>
  );
};

export default HotspotPopover;
