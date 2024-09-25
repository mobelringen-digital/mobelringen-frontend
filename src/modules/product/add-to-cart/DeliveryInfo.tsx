import React from "react";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";
import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import {
  Availability,
  BaseProductFragment,
  GetProductStockQuery,
} from "@/types";

interface Props {
  product: BaseProductFragment;
  stock?: GetProductStockQuery;
}

const STATUS_COLOR: Record<Availability, "green" | "yellow" | "red"> = {
  IN_STOCK: "green",
  BACKORDER: "yellow",
  OUT_OF_STOCK: "red",
};

export const DeliveryInfo: React.FC<Props> = ({ product, stock }) => {
  const storesWithStock = product.stores?.filter(
    (store) => store?.qty && store.qty > 0,
  );
  const stockData = stock?.getProductStock;
  const canBuyOnline =
    stockData?.online?.availability !== Availability.OutOfStock;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="font-semibold flex items-center gap-2 text-sm lg:text-base">
          <LocalShippingIcon width={24} height={24} />
          Nettbutikk
        </span>

        <div className="flex gap-2 mt-2">
          {stockData?.online?.availability ? (
            <StatusCircle
              variant={STATUS_COLOR[stockData?.online?.availability]}
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
              variant={STATUS_COLOR[stockData.cac.availability]}
              className="mt-1 ml-1"
            />
          ) : null}

          <div className="flex flex-col">
            <span className="text-sm lg:text-base">
              {stockData?.cac?.message}
            </span>
            <span className="text-xs lg:text-sm text-dark-grey">
              Tilgjengelig i {storesWithStock?.length ?? 0} butikker
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
