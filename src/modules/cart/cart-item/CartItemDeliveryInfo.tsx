import React from "react";

import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { useCartItem } from "@/modules/cart/hooks/useCartItem";
import { PRODUCT_STOCK_STATUS_COLOR } from "@/modules/product/add-to-cart/DeliveryInfo";
import { Availability, CartItemFragment } from "@/types";

interface Props {
  item: CartItemFragment;
}

export const CartItemDeliveryInfo: React.FC<Props> = ({ item }) => {
  const { isOnline, isClickAndCollect } = useCartItem(item);

  const hasOnlineStock =
    item.availability?.online?.availability !== Availability.OutOfStock;

  return (
    <div className="w-full">
      {isOnline ? (
        <div className="flex items-center gap-2">
          {item.availability?.online?.availability ? (
            <StatusCircle
              variant={
                PRODUCT_STOCK_STATUS_COLOR[
                  item.availability?.online?.availability
                ]
              }
              size="small"
            />
          ) : null}

          {hasOnlineStock ? (
            <span className="text-xs">{item.product.delivery_promise}</span>
          ) : (
            <span className="text-xs">
              {item.availability?.online?.message}
            </span>
          )}
        </div>
      ) : null}
      {isClickAndCollect && !item.is_in_store ? (
        <div className="flex items-center gap-2">
          {item.availability?.cac?.availability ? (
            <StatusCircle variant="red" size="small" />
          ) : null}
          <span className="text-xs">Ikke tilgjengelig i butikk</span>
        </div>
      ) : null}
      {isClickAndCollect && item.is_in_store ? (
        <div className="flex items-center gap-2">
          {item.availability?.cac?.availability ? (
            <StatusCircle
              variant={
                PRODUCT_STOCK_STATUS_COLOR[item.availability?.cac?.availability]
              }
              size="small"
            />
          ) : null}
          <span className="text-xs">{item.availability?.cac?.message}</span>
        </div>
      ) : null}
    </div>
  );
};
