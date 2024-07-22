import React from "react";

import {
  addToCart,
  createEmptyCart,
} from "@/components/cart/add-to-cart/actions";
import { AddToCartController } from "@/components/cart/add-to-cart/AddToCartController";
import { BaseCartFragment, BaseProductFragment } from "@/types";

import { navigate } from "../../../app/actions";

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
  const handleAddItemToCart = async () => {
    if (cart?.id && product.sku && quantity) {
      return addToCart(cart?.id, [
        {
          sku: product.sku,
          quantity,
        },
      ]).then(() => navigate("?cart=true"));
    }

    if (!cart?.id) {
      const emptyCart = await createEmptyCart();
      if (emptyCart.createEmptyCart && product.sku && quantity) {
        await addToCart(emptyCart.createEmptyCart, [
          {
            sku: product.sku,
            quantity,
          },
        ]).then(() => navigate("?cart=true"));
      }
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
