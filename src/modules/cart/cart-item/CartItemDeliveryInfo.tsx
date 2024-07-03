import React from "react";

import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { useCartItem } from "@/modules/cart/hooks/useCartItem";
import { CartItemFragment } from "@/types";

interface Props {
  item: CartItemFragment;
}

export const CartItemDeliveryInfo: React.FC<Props> = ({ item }) => {
  const { isDeliveryMessageVisible, isStockAvailable, isClickAndCollect } =
    useCartItem(item);

  return (
    <div className="w-full">
      {isDeliveryMessageVisible ? (
        <div className="flex items-center gap-2">
          <StatusCircle variant="green" size="small" />
          <span className="text-xs">{item.product.delivery_promise}</span>
        </div>
      ) : null}
      {isClickAndCollect ? (
        <>
          {isStockAvailable ? (
            <div className="flex items-center gap-2">
              <StatusCircle variant="green" size="small" />
              <span className="text-xs">{item.product.delivery_promise}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <StatusCircle variant="red" size="small" />
              <span className="text-xs">Ikke tilgjengelig i butikk</span>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
