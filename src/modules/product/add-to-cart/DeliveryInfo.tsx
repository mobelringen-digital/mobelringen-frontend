"use client";

import React from "react";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { setFavoriteStoreId } from "@/components/store-selector/actions";
import { ChangeStoreModal } from "@/modules/product/add-to-cart/ChangeStoreModal";
import {
  Availability,
  BaseProductFragment,
  GetProductStockQuery,
  ProductStoresFragment,
} from "@/types";

interface Props {
  product: BaseProductFragment;
  stock?: GetProductStockQuery;
}

export const PRODUCT_STOCK_STATUS_COLOR: Record<
  Availability,
  "green" | "yellow" | "red"
> = {
  IN_STOCK: "green",
  BACKORDER: "yellow",
  OUT_OF_STOCK: "red",
};

export const DeliveryInfo: React.FC<Props> = ({ product, stock }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = React.useState(false);

  const storesWithStock = product.stores?.filter(
    (store) => store?.qty && store.qty > 0,
  );
  const stockData = stock?.getProductStock;
  const canBuyOnline =
    stockData?.online?.availability !== Availability.OutOfStock;

  const selectDifferentStore = async (store: ProductStoresFragment | null) => {
    if (!store) return;
    if (!store.external_id) return;

    setIsLoading(true);
    return setFavoriteStoreId(String(store.external_id))
      .then(() => {
        setTimeout(() => {
          // Wait for tag revalidate
          setIsStoreModalOpen(false);
        }, 1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {isLoading ? <PageTopLoader /> : null}
      {storesWithStock ? (
        <ChangeStoreModal
          isOpen={isStoreModalOpen}
          stores={storesWithStock}
          onClose={() => setIsStoreModalOpen((prev) => !prev)}
          onStoreChange={selectDifferentStore}
        />
      ) : null}

      <div>
        <span className="font-semibold flex items-center gap-2 text-sm lg:text-base">
          <LocalShippingIcon width={24} height={24} />
          Nettbutikk
        </span>

        <div className="flex gap-2 mt-2">
          {stockData?.online?.availability ? (
            <StatusCircle
              variant={
                PRODUCT_STOCK_STATUS_COLOR[stockData?.online?.availability]
              }
              className="mt-1 ml-1"
            />
          ) : null}

          <div className="flex flex-col">
            <span className="text-sm lg:text-base">
              {stockData?.online?.message}
            </span>
            {canBuyOnline && product.delivery_promise ? (
              <span className="text-xs lg:text-sm text-dark-grey">
                {product.delivery_promise}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <span className="font-semibold flex items-center gap-2 text-sm lg:text-base">
          <StorefrontIcon width={24} height={24} />
          Klikk og hent
        </span>
        <div className="flex gap-2 mt-2">
          {stockData?.cac?.availability ? (
            <StatusCircle
              variant={PRODUCT_STOCK_STATUS_COLOR[stockData.cac.availability]}
              className="mt-1 ml-1"
            />
          ) : null}

          <div className="flex flex-col">
            <span className="text-sm lg:text-base">
              {stockData?.cac?.message}
            </span>
            <button
              onClick={() => setIsStoreModalOpen((prev) => !prev)}
              className="text-xs lg:text-sm text-dark-grey text-left"
            >
              Tilgjengelig i {storesWithStock?.length ?? 0} butikker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
