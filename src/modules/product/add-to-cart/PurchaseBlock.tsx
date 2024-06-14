"use client";

import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { QuantityInput } from "@/components/_ui/quantity-input/QuantityInput";
import { useActiveProductData } from "@/modules/product/active-product-data-provider/useActiveProductData";
import { DeliveryInfo } from "@/modules/product/add-to-cart/DeliveryInfo";
import { InfoIcons } from "@/modules/product/add-to-cart/InfoIcons";
import { BaseProductFragment } from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  product: BaseProductFragment;
}

export const PurchaseBlock: React.FC<Props> = ({ product }) => {
  const priceRange = product.price_range;
  const { finalPrice, currency } = usePriceRange(priceRange);
  const [quantity, setQuantity] = React.useState(1);
  const { activeProductVariant } = useActiveProductData();

  const isVariantNotSelected =
    product.__typename === "ConfigurableProduct" &&
    !activeProductVariant.variant;

  return (
    <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-4">
      <DeliveryInfo deliveryPromise={product?.delivery_promise} />
      <div className="flex gap-4 items-center mt-4">
        <QuantityInput
          disabled={isVariantNotSelected}
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
      <div className="flex flex-col gap-4">
        <Button disabled={isVariantNotSelected} color="primary">
          Legg i handlekurv
        </Button>
        <Button disabled={isVariantNotSelected} color="secondary">
          Klikk og hent
        </Button>
      </div>
      <InfoIcons />
    </div>
  );
};
