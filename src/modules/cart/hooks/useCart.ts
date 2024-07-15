import React from "react";

import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";

import { useSearchParams } from "next/navigation";

import { CartCookie } from "@/components/cart/fetchCartService";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { ProductStockStatus } from "@/types";

export const useCart = () => {
  const { data: cart } = useCartQuery();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);
  const { data: user } = useSession();
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

  const cartId = React.useMemo(() => {
    if (!!user?.token && cart?.id) {
      return cart.id;
    }

    return cookies.cart ?? "";
  }, [cart?.id, cookies.cart, user?.token]);

  return { isCheckoutEnabled, cartId, user };
};
