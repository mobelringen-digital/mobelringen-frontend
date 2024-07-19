"use client";

import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { Button } from "@/components/_ui/button/Button";
import {
  addToCart,
  createEmptyCart,
} from "@/components/cart/add-to-cart/actions";
import { ProductAddedModal } from "@/components/cart/add-to-cart/ProductAddedModal";
import { CART_QUERY_KEY, CartCookie } from "@/components/cart/fetchCartService";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BaseProductFragment } from "@/types";

interface Props {
  isDisabled?: boolean;
  product: BaseProductFragment;
  quantity: number;
}

export const AddToCart: React.FC<Props> = ({
  isDisabled,
  product,
  quantity,
}) => {
  const queryClient = useQueryClient();
  const { cartId, user } = useCart();
  const [isOpen, setOpen] = React.useState(false);
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  const handleAddItemToCart = async () => {
    if ((cookies.cart || user?.token) && product.sku && quantity) {
      return addToCart(cartId, [
        {
          sku: product.sku,
          quantity,
        },
      ]).then(() => {
        queryClient.invalidateQueries({ queryKey: [...CART_QUERY_KEY] });
        setOpen(true);
      });
    }

    if (!cookies.cart && !user?.token) {
      const emptyCart = await createEmptyCart();
      if (emptyCart.createEmptyCart && product.sku && quantity) {
        await addToCart(emptyCart.createEmptyCart, [
          {
            sku: product.sku,
            quantity,
          },
        ]).then(() => {
          queryClient.invalidateQueries({ queryKey: [...CART_QUERY_KEY] });
          setOpen(true);
        });
      }
    }
  };

  return (
    <>
      <ProductAddedModal
        product={product}
        isOpen={isOpen}
        onOpenChange={() => setOpen((prev) => !prev)}
      />
      <div className="flex flex-col gap-4">
        <Button
          onClick={handleAddItemToCart}
          disabled={isDisabled}
          color="primary"
        >
          Legg i handlekurv
        </Button>
        <Button disabled={isDisabled} color="secondary">
          Klikk og hent
        </Button>
      </div>
    </>
  );
};
