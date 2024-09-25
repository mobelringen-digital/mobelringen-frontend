"use client";

import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { QuantityInput } from "@/components/_ui/quantity-input/QuantityInput";
import { AddToCart } from "@/components/cart/add-to-cart/AddToCart";
import { useActiveProductData } from "@/modules/product/active-product-data-provider/useActiveProductData";
import { DeliveryInfo } from "@/modules/product/add-to-cart/DeliveryInfo";
import { KlarnaInformation } from "@/modules/product/add-to-cart/KlarnaInformation";
import {
  BaseCartFragment,
  BaseProductFragment,
  GetProductStockQuery,
} from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { usePriceRange } from "@/utils/hooks/usePriceRange";

interface Props {
  product: BaseProductFragment;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
}

export const PurchaseBlock: React.FC<Props> = ({ product, cart, stock }) => {
  const priceRange = product.price_range;
  const { finalPrice, currency } = usePriceRange(priceRange);
  const [quantity, setQuantity] = React.useState(1);
  const { activeProductVariant } = useActiveProductData();

  const isVariantNotSelected =
    isTypename(product, ["ConfigurableProduct"]) &&
    !activeProductVariant.variant;

  return (
    <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-4">
      <DeliveryInfo stock={stock} product={product} />

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
      <AddToCart
        cart={cart}
        product={product}
        quantity={quantity}
        stock={stock}
      />

      <KlarnaInformation />
    </div>
  );
};
