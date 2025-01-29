"use client";

import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { setFavoriteStoreId } from "@/components/store-selector/actions";
import { ChangeStoreModal } from "@/modules/product/add-to-cart/ChangeStoreModal";
import { useProductData } from "@/modules/product/context/useProductData";
import {
  Availability,
  BaseProductFragment,
  ProductStoresFragment,
} from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  product: BaseProductFragment;
}

export const PRODUCT_STOCK_STATUS_COLOR: Record<
  Availability,
  "green" | "yellow" | "red" | "green-circle"
> = {
  IN_STOCK: "green",
  BACKORDER: "yellow",
  OUT_OF_STOCK: "red",
  ONLINE_BACKORDER_CAC_OUT_OF_STOCK: "green-circle",
};

export const DeliveryInfo: React.FC<Props> = ({ product }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isModalOpen = searchParams.get("store") === "change";

  const { stores, stock, canBuyOnline } = useProductData();

  const closeModal = () => {
    router.push(pathname);
  };

  const storesData = React.useMemo(() => {
    const productData =
      stores?.products?.items?.[stores?.products?.items?.length - 1];

    if (!productData) return null;

    if (isTypename(productData, ["ConfigurableProduct"])) {
      return productData.stores;
    }

    if (isTypename(productData, ["SimpleProduct"])) {
      return productData.stores;
    }
  }, [stores]);

  const storesWithStock = storesData?.filter(
    (store) => store?.qty && store.qty > 0,
  );
  const stockData = stock?.getProductStock;

  const selectDifferentStore = async (store: ProductStoresFragment | null) => {
    if (!store) return;
    if (!store.external_id) return;

    setIsLoading(true);
    return setFavoriteStoreId(String(store.external_id))
      .then(() => {
        setTimeout(() => {
          // Wait for tag revalidate
          closeModal();
        }, 1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {isLoading ? <PageTopLoader /> : null}
      {storesWithStock ? (
        <ChangeStoreModal
          isOpen={isModalOpen}
          stores={storesWithStock}
          onClose={closeModal}
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
            {storesWithStock?.length && storesWithStock.length > 0 ? (
              <button
                aria-label="Stock info"
                onClick={() => router.push(`${pathname}?store=change`)}
                className="text-xs lg:text-sm text-dark-grey text-left"
              >
                Tilgjengelig i{" "}
                <span className="underline">
                  {storesWithStock?.length ?? 0}{" "}
                  {storesWithStock.length > 1 ? "butikker" : "butikk"}
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
