"use client";

import { useCookies } from "react-cookie";

import { useSearchParams } from "next/navigation";

import { CartCookie } from "@/components/cart/fetchCartService";
import { Availability, CartItemFragment } from "@/types";

export const useCartItem = (item: CartItemFragment | null) => {
  const searchParams = useSearchParams();
  const [cookies] = useCookies<"cart" | "preferredMethod", CartCookie>([
    "cart",
    "preferredMethod",
  ]);
  const isClickAndCollect =
    searchParams.get("method") === "collect" ||
    cookies.preferredMethod === "collect";
  const isOnline =
    searchParams.get("method") === "online" ||
    cookies.preferredMethod === "online";

  const isDeliveryMessageVisible =
    !isClickAndCollect &&
    item?.product.delivery_promise &&
    item.availability?.online?.availability !== Availability.OutOfStock;
  const isCacAvailable =
    isClickAndCollect &&
    item?.availability?.cac?.availability !== Availability.OutOfStock;

  return {
    isClickAndCollect,
    isOnline,
    isCacAvailable,
    isDeliveryMessageVisible,
  };
};
