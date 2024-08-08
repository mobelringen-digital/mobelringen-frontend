"use client";

import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ProductAddedModal } from "@/components/cart/add-to-cart/ProductAddedModal";
import { AddProductToCartMutation, BaseProductFragment } from "@/types";

interface Props {
  isDisabled?: boolean;
  product: BaseProductFragment;
  quantity: number;
  onAddToCart: (
    preferredMethod: "online" | "collect",
  ) => Promise<string | AddProductToCartMutation | undefined>;
}

export const AddToCartController: React.FC<Props> = ({
  isDisabled,
  product,
  onAddToCart,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isOpen = searchParams.get("cart") === "true";

  const setClose = () => {
    return router.push(pathname);
  };

  const handleAddItemToCart = async (preferredMethod: "online" | "collect") => {
    setIsLoading(true);
    await onAddToCart(preferredMethod).finally(() => {
      router.push(`${pathname}?cart=true`);
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
          onClick={() => handleAddItemToCart("online")}
          disabled={isDisabled || isLoading}
          color="primary"
        >
          Legg i handlekurv
        </Button>
        <Button
          onClick={() => handleAddItemToCart("collect")}
          disabled={isDisabled || isLoading}
          color="secondary"
        >
          Klikk og hent
        </Button>
      </div>
    </>
  );
};
