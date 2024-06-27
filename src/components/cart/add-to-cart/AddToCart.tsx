"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { Button } from "@/components/_ui/button/Button";
import { ProductAddedModal } from "@/components/cart/add-to-cart/ProductAddedModal";
import { useAddProductToCartMutation } from "@/components/cart/add-to-cart/useAddProductToCartMutation";
import { useCreateEmptyCartMutation } from "@/components/cart/add-to-cart/useCreateEmptyCartMutation";
import { CartCookie } from "@/components/cart/useCartQuery";
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
  const [isOpen, setOpen] = React.useState(false);
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);
  const { mutate: createEmptyCart, isPending: isCreateCartLoading } =
    useCreateEmptyCartMutation();
  const { mutate: addProductToCart, isPending: isAddToCartLoading } =
    useAddProductToCartMutation();

  const isButtonDisabled =
    isDisabled || isCreateCartLoading || isAddToCartLoading;

  const handleAddItemToCart = async () => {
    if (!cookies.cart) {
      createEmptyCart(undefined, {
        onSettled: async (cartId) => {
          if (product.sku && quantity && cartId) {
            addProductToCart(
              {
                cartItems: [
                  {
                    sku: product.sku,
                    quantity,
                  },
                ],
                cartId,
              },
              {
                onSuccess: () => setOpen(true),
              },
            );
          }
        },
      });
    } else {
      if (!!cookies.cart && product.sku && quantity) {
        addProductToCart(
          {
            cartItems: [
              {
                sku: product.sku,
                quantity,
              },
            ],
          },
          {
            onSuccess: () => setOpen(true),
          },
        );
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
          disabled={isButtonDisabled}
          color="primary"
        >
          Legg i handlekurv
        </Button>
        <Button disabled={isButtonDisabled} color="secondary">
          Klikk og hent
        </Button>
      </div>
    </>
  );
};
