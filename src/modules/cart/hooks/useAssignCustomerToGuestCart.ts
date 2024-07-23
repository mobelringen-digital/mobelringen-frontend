"use client";

import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CartCookie } from "@/components/cart/fetchCartService";
import { AssignCustomerToGuestCart } from "@/queries/cart.queries";
import { useSession } from "@/utils/hooks/useSession";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const useAssignCustomerToGuestCart = () => {
  const { token } = useSession();
  const [cookies, _setCookie, removeCookie] = useCookies<"cart", CartCookie>([
    "cart",
  ]);

  const assignCustomerToGuestCart = async () => {
    return await authorizedMagentoClient(token, "POST").request(
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
