import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";

import { CART_QUERY_KEY, CartCookie } from "@/components/cart/fetchCartService";
import { PlaceOrder } from "@/queries/cart.queries";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const usePlaceOrderMutation = () => {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  const placeOrder = async () => {
    return await authorizedMagentoClient(String(data?.token), "POST").request(
      PlaceOrder,
      {
        cartId: cookies.cart,
      },
    );
  };

  return useMutation({
    mutationFn: placeOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
