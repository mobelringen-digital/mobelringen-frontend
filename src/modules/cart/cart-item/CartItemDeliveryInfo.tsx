import React from "react";

import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { PRODUCT_STOCK_STATUS_COLOR } from "@/modules/product/add-to-cart/DeliveryInfo";
import { BaseCartFragment, CartItemFragment, DeliveryType } from "@/types";

interface Props {
  item: CartItemFragment;
  cart?: BaseCartFragment | null;
}

export const CartItemDeliveryInfo: React.FC<Props> = ({ item, cart }) => {
  const isOnline = cart?.delivery_type === DeliveryType.Online;
  const isClickAndCollect = cart?.delivery_type === DeliveryType.Cac;

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

          <span className="text-xs">
            {item.availability?.online?.cart_stock_info}
          </span>
        </div>
      ) : null}
      {isClickAndCollect ? (
        <div className="flex items-center gap-2">
          {item.availability?.cac?.availability ? (
            <StatusCircle
              variant={
                item.is_in_store
                  ? PRODUCT_STOCK_STATUS_COLOR[
                    item.availability?.cac?.availability
                  ]
                  : "red"
              }
              size="small"
            />
          ) : null}
          <span className="text-xs">
            {item.availability?.cac?.cart_stock_info}
          </span>
        </div>
      ) : null}
    </div>
  );
};
