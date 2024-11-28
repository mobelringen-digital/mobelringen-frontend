"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { revalidateCart } from "@/components/cart/add-to-cart/actions";
import { ProductAddedModal } from "@/components/cart/add-to-cart/ProductAddedModal";
import {
  Availability,
  BaseProductFragment,
  BaseStoreFragment,
  DeliveryType,
  GetProductStockQuery,
} from "@/types";
import { formatGTMCategories } from "@/utils/gtm";

interface Props {
  isDisabled?: boolean;
  product: BaseProductFragment;
  quantity: number;
  onAddToCart: (preferredMethod: DeliveryType) => Promise<undefined | void>;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
}

const selectStoreGTMEvent = (product: BaseProductFragment) => {
  if (!product) {
    return;
  }

  return sendGTMEvent({
    event: "select_store",
    items: [
      {
        item_id: product.sku,
        item_name: product.name,
        item_brand: product.productBrand?.name,
        price: product.price_range.maximum_price?.final_price.value,
        discount: product.price_range.maximum_price?.discount?.amount_off,
        ...formatGTMCategories(
          product.categories?.map((category) => ({
            name: category?.name,
          })),
        ),
      },
    ],
  });
};

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

  const setClose = async () => {
    await revalidateCart();
    setIsLoading(false);
    return router.push(pathname);
  };

  const handleAddItemToCart = async (preferredMethod: DeliveryType) => {
    if (preferredMethod === DeliveryType.Online && !canBuyOnline) {
      return;
    }
    if (preferredMethod === DeliveryType.Cac && !canBuyCAC) {
      return;
    }

    setIsLoading(true);
    await onAddToCart(preferredMethod).finally(() => {
      router.push(`${pathname}?cart=true&preferredMethod=${preferredMethod}`);
    });
  };

  const handleOpenStoreSelect = () => {
    if (!canBuyCAC || isLoading) {
      return;
    }

    selectStoreGTMEvent(product);

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
        selectedStore={selectedStore}
      />
      <div className="flex flex-col gap-4">
        <Button
          aria-label=" Legg i handlekurv"
          onClick={() => handleAddItemToCart(DeliveryType.Online)}
          disabled={!canBuyOnline || isLoading}
          color="primary"
        >
          Legg i handlekurv
        </Button>
        {!selectedStore?.external_id ? (
          <Button
            aria-label="Velg butikk"
            onClick={handleOpenStoreSelect}
            disabled={!canBuyCAC || isLoading}
            color="secondary"
          >
            Velg butikk
          </Button>
        ) : (
          <Button
            aria-label="Klikk og hent"
            onClick={() => handleAddItemToCart(DeliveryType.Cac)}
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
