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
      aria-label={`Les mer om ${product?.name}`}
      href={`/${product?.canonical_url}`}
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
          <div className="flex gap-2 mt-2">
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
        <div className="bg-warm-grey p-2 ml-4 rounded-full">
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
};

export default HotspotPopover;
