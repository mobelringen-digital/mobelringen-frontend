"use client";

import { useSearchParams } from "next/navigation";

import { CartItemFragment } from "@/types";

export const useCartItem = (item: CartItemFragment | null) => {
  const searchParams = useSearchParams();
  const isClickAndCollect = searchParams.get("method") === "collect";

  const isDeliveryMessageVisible =
    !isClickAndCollect && item?.product.delivery_promise;
  const isStockAvailable = isClickAndCollect && item?.is_in_store;

  return { isClickAndCollect, isStockAvailable, isDeliveryMessageVisible };
};
