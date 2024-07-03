import React from "react";

import { useSearchParams } from "next/navigation";

import { BaseCartFragment, ProductStockStatus } from "@/types";

export const useCart = (cart?: BaseCartFragment | null) => {
  const searchParams = useSearchParams();
  const isClickAndCollect = searchParams.get("method") === "collect";

  const isCheckoutEnabled = React.useMemo(() => {
    if (isClickAndCollect) {
      return cart?.items?.every((item) => item?.is_in_store);
    }

    return cart?.items?.every(
      (item) => item?.product.stock_status === ProductStockStatus.InStock,
    );
  }, [cart, isClickAndCollect]);

  return { isCheckoutEnabled };
};
