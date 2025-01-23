"use client";

import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { QuantityInput } from "@/components/_ui/quantity-input/QuantityInput";
import { AddToCart } from "@/components/cart/add-to-cart/AddToCart";
import { DeliveryInfo } from "@/modules/product/add-to-cart/DeliveryInfo";
import { KlarnaInformation } from "@/modules/product/add-to-cart/KlarnaInformation";
import { useProductData } from "@/modules/product/context/useProductData";
import {
  BaseProductFragment,
} from "@/types";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  product: BaseProductFragment;
}

export const PurchaseBlock: React.FC<Props> = ({ product }) => {
  const { stock } = useProductData();
  const priceRange = product.price_range;
  const { finalPrice, currency } = usePriceRange(priceRange);
  const [quantity, setQuantity] = React.useState(
    stock?.getProductStock.online?.step ?? 1,
  );

  const setQuantityData = (type: "inc" | "dec") => {
    const min =
      stock?.getProductStock.online?.step ??
      stock?.getProductStock.online?.min ??
      1;
    const max = stock?.getProductStock.online?.max ?? 1;
    const minimumStep = stock?.getProductStock.online?.step ?? 1;

    if (type === "inc") {
      if (quantity + minimumStep <= max) {
        setQuantity(quantity + minimumStep);
      }
    } else if (type === "dec") {
      if (quantity - minimumStep >= min) {
        setQuantity(quantity - minimumStep);
      }
    }
  };

  return (
    <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-4">
      <DeliveryInfo product={product} />

      {/*{!canBuyCAC ? (*/}
      {/*  <div className="border border-red border-opacity-50 rounded-xl p-2 mb-2">*/}
      {/*    <div className="flex gap-2">*/}
      {/*      <Info fill="#FF3E3E" />*/}
      {/*      <div className="flex flex-col gap-2 text-xs text-red">*/}
      {/*        Dersom varen ikke er på lager for Klikk og hent, kan du alltid*/}
      {/*        bestille den i våre butikker.*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : null}*/}

      <div className="flex gap-4 items-center">
        <QuantityInput
          value={quantity.toString()}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          onQuantityIncrement={() => setQuantityData("inc")}
          onQuantityDecrement={() => setQuantityData("dec")}
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
      <AddToCart product={product} quantity={quantity} />

      <KlarnaInformation />
    </div>
  );
};
