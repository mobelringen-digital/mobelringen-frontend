"use client";

import { useSearchParams } from "next/navigation";

import { Availability, CartItemFragment } from "@/types";

export const useCartItem = (item: CartItemFragment | null) => {
  const searchParams = useSearchParams();
  const isClickAndCollect = searchParams.get("method") === "collect";
  const isOnline = searchParams.get("method") === "online";

  const isDeliveryMessageVisible =
    !isClickAndCollect &&
    item?.product.delivery_promise &&
    item.availability?.online?.availability !== Availability.OutOfStock;
  const isCacAvailable =
    isClickAndCollect &&
    item?.availability?.cac?.availability !== Availability.OutOfStock;

  return { isClickAndCollect, isOnline, isCacAvailable, isDeliveryMessageVisible };
};
