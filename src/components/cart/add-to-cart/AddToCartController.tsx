"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ProductAddedModal } from "@/components/cart/add-to-cart/ProductAddedModal";
import { BaseProductFragment } from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  isDisabled?: boolean;
  product: BaseProductFragment;
  quantity: number;
  onAddToCart: () => Promise<void>;
}

export const AddToCartController: React.FC<Props> = ({
  isDisabled,
  product,
  onAddToCart,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("cart") === "true";

  const setClose = async () => {
    return navigate("?");
  };

  const handleAddItemToCart = async () => {
    setIsLoading(true);
    await onAddToCart().finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <ProductAddedModal
        product={product}
        isOpen={isOpen}
        onOpenChange={() => setClose()}
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
