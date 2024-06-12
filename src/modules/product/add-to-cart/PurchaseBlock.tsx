"use client";

import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { QuantityInput } from "@/components/_ui/quantity-input/QuantityInput";
import { DeliveryInfo } from "@/modules/product/add-to-cart/DeliveryInfo";
import { ProductPriceRangeFragment } from "@/queries/product.queries";
import { BaseProductFragment } from "@/types";
import { useFragment } from "@/types/schema";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  product: BaseProductFragment;
}

export const PurchaseBlock: React.FC<Props> = ({ product }) => {
  const priceRange = useFragment(
    ProductPriceRangeFragment,
    product.price_range,
  );
  const { finalPrice, currency } = usePriceRange(priceRange);
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="bg-white p-4 lg:p-8 rounded-2xl">
      <DeliveryInfo />
      <div className="flex gap-4 mt-8 items-center">
        <QuantityInput
          value={quantity.toString()}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          onQuantityIncrement={() => setQuantity(quantity + 1)}
          onQuantityDecrement={() =>
            setQuantity(quantity > 1 ? quantity - 1 : 1)
          }
        />
        {finalPrice ? (
          <div className="flex flex-col text-sm">
            <span>Totalpris:</span>
            <span className="font-semibold">
              <FormatNumber
                value={finalPrice * quantity}
                format="currency"
                suffix={currency}
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
