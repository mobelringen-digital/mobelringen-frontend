"use client";

import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { ProductAddedModal } from "@/components/cart/add-to-cart/ProductAddedModal";
import {
  AddProductToCartMutation,
  Availability,
  BaseProductFragment,
  BaseStoreFragment,
  GetProductStockQuery,
} from "@/types";

interface Props {
  isDisabled?: boolean;
  product: BaseProductFragment;
  quantity: number;
  onAddToCart: (
    preferredMethod: "online" | "collect",
  ) => Promise<string | AddProductToCartMutation | undefined>;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
}

export const AddToCartController: React.FC<Props> = ({
  product,
  onAddToCart,
  stock,
  selectedStore,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isOpen = searchParams.get("cart") === "true";

  const canBuyOnline =
    stock?.getProductStock.online?.availability !== Availability.OutOfStock;
  const canBuyCAC =
    stock?.getProductStock.cac?.availability !== Availability.OutOfStock;

  const setClose = () => {
    setIsLoading(false);
    return router.push(pathname);
  };

  const handleAddItemToCart = async (preferredMethod: "online" | "collect") => {
    if (preferredMethod === "online" && !canBuyOnline) {
      return;
    }
    if (preferredMethod === "collect" && !canBuyCAC) {
      return;
    }

    setIsLoading(true);
    await onAddToCart(preferredMethod).finally(() => {
      router.push(`${pathname}?cart=true`);
    });
  };

  const handleOpenStoreSelect = () => {
    if (!canBuyCAC || isLoading) {
      return;
    }

    return router.push(`${pathname}?store=change`);
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <ProductAddedModal
        product={product}
        isOpen={isOpen}
        onOpenChange={() => setClose()}
        onClose={() => setClose()}
      />
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => handleAddItemToCart("online")}
          disabled={!canBuyOnline || isLoading}
          color="primary"
        >
          Legg i handlekurv
        </Button>
        {!selectedStore?.external_id ? (
          <Button
            onClick={handleOpenStoreSelect}
            disabled={!canBuyCAC || isLoading}
            color="secondary"
          >
            Velg butikk
          </Button>
        ) : (
          <Button
            onClick={() => handleAddItemToCart("collect")}
            disabled={!canBuyCAC || isLoading}
            color="secondary"
          >
            Klikk og hent
          </Button>
        )}
      </div>
    </>
  );
};
