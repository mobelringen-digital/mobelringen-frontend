import React from "react";

import {
  addToCart,
  createCartAndAddProduct,
} from "@/components/cart/add-to-cart/actions";
import { AddToCartController } from "@/components/cart/add-to-cart/AddToCartController";
import { BaseCartFragment, BaseProductFragment } from "@/types";

interface Props {
  isDisabled?: boolean;
  product: BaseProductFragment;
  quantity: number;
  cart?: BaseCartFragment | null;
}

export const AddToCart: React.FC<Props> = ({
  isDisabled,
  product,
  quantity,
  cart,
}) => {
  const handleAddItemToCart = async (preferredMethod: "online" | "collect") => {
    if (preferredMethod === "online" && isDisabled) {
      return;
    }

    if (cart?.id && product.sku && quantity) {
      return addToCart(
        cart?.id,
        [
          {
            sku: product.sku,
            quantity,
          },
        ],
        preferredMethod,
      );
    }

    if (!cart?.id && product.sku && quantity) {
      return createCartAndAddProduct(
        [
          {
            sku: product.sku,
            quantity,
          },
        ],
        preferredMethod,
      );
    }
  };

  return (
    <AddToCartController
      isDisabled={isDisabled}
      product={product}
      quantity={quantity}
      onAddToCart={handleAddItemToCart}
    />
  );
};
