"use client";

import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { ProductAddedModal } from "@/components/cart/add-to-cart/ProductAddedModal";
import { AddProductToCartMutation, BaseProductFragment } from "@/types";

interface Props {
  isDisabled?: boolean;
  product: BaseProductFragment;
  quantity: number;
  onAddToCart: () => Promise<AddProductToCartMutation | undefined>;
}

export const AddToCartController: React.FC<Props> = ({
  isDisabled,
  product,
  onAddToCart,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);

  const handleAddItemToCart = async () => {
    setIsLoading(true);
    await onAddToCart().finally(() => {
      setIsLoading(false);
      setTimeout(() => setOpen(true), 500);
    });
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
          disabled={isDisabled || isLoading}
          color="primary"
        >
          Legg i handlekurv
        </Button>
        <Button disabled={isDisabled || isLoading} color="secondary">
          Klikk og hent
        </Button>
      </div>
    </>
  );
};
