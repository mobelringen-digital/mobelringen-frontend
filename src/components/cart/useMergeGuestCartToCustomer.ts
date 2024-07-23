"use client";

import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CART_QUERY_KEY, CartCookie } from "@/components/cart/fetchCartService";
import { useAssignCustomerToGuestCart } from "@/modules/cart/hooks/useAssignCustomerToGuestCart";
import { useSession } from "@/utils/hooks/useSession";

export const useMergeGuestCartToCustomer = () => {
  const queryClient = useQueryClient();
  const [cookies, _setCookie, removeCookie] = useCookies<"cart", CartCookie>([
    "cart",
  ]);
  const { token } = useSession();
  const { mutate: assignCustomerToGuestCart } = useAssignCustomerToGuestCart();

  React.useEffect(() => {
    (async () => {
      if (!!token && cookies.cart) {
        assignCustomerToGuestCart(undefined, {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
          },
        });
        removeCookie("cart");
      }
    })();
  }, [
    assignCustomerToGuestCart,
    cookies.cart,
    queryClient,
    removeCookie,
    token,
  ]);

  return null;
};
