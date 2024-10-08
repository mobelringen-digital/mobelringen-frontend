"use client";

import { useCookies } from "react-cookie";

import { CartCookie } from "@/components/cart/fetchCartService";
import {Availability, CartItemFragment, DeliveryType} from "@/types";

export const useCartItem = (item: CartItemFragment | null) => {
  const [cookies] = useCookies<"cart" | "preferredMethod", CartCookie>([
    "cart",
    "preferredMethod",
  ]);
  const isClickAndCollect = cookies.preferredMethod === DeliveryType.Cac;
  const isOnline = cookies.preferredMethod === DeliveryType.Online;

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
