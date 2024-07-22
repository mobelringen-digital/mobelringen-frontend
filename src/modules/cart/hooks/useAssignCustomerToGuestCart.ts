"use client";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";

import { CartCookie } from "@/components/cart/fetchCartService";
import { AssignCustomerToGuestCart } from "@/queries/cart.queries";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const useAssignCustomerToGuestCart = () => {
  const { data } = useSession();
  const [cookies, _setCookie, removeCookie] = useCookies<"cart", CartCookie>([
    "cart",
  ]);

  const assignCustomerToGuestCart = async () => {
    return await authorizedMagentoClient(String(data?.token), "POST").request(
      AssignCustomerToGuestCart,
      {
        cartId: cookies.cart,
      },
    );
  };

  return useMutation({
    mutationFn: assignCustomerToGuestCart,
    onSuccess: () => removeCookie("cart"),
  });
};
