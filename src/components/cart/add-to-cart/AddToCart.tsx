"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { Button } from "@/components/_ui/button/Button";
import { ProductAddedModal } from "@/components/cart/add-to-cart/ProductAddedModal";
import { useAddProductToCartMutation } from "@/components/cart/add-to-cart/useAddProductToCartMutation";
import { useCreateEmptyCartMutation } from "@/components/cart/add-to-cart/useCreateEmptyCartMutation";
import { CartCookie } from "@/components/cart/fetchCartService";
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
  const { cartId, user } = useCart();
  const [isOpen, setOpen] = React.useState(false);
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);
  const { mutate: createEmptyCart, isPending: isCreateCartLoading } =
    useCreateEmptyCartMutation();
  const { mutate: addProductToCart, isPending: isAddToCartLoading } =
    useAddProductToCartMutation();

  const isButtonDisabled =
    isDisabled || isCreateCartLoading || isAddToCartLoading;

  const handleAddItemToCart = async () => {
    if (!cookies.cart && !user?.token) {
      createEmptyCart(undefined, {
        onSettled: async (cId) => {
          if (product.sku && quantity && cId) {
            addProductToCart(
              {
                cartItems: [
                  {
                    sku: product.sku,
                    quantity,
                  },
                ],
                cartId: cId,
              },
              {
                onSuccess: () => setOpen(true),
              },
            );
          }
        },
      });
    } else {
      if (!!cartId && product.sku && quantity) {
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
