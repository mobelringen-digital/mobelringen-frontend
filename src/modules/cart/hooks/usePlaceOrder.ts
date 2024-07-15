import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { CART_QUERY_KEY } from "@/components/cart/fetchCartService";
import { useCart } from "@/modules/cart/hooks/useCart";
import { PlaceOrder } from "@/queries/cart.queries";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const usePlaceOrderMutation = () => {
  const { data } = useSession();
  const { cartId } = useCart();
  const queryClient = useQueryClient();

  const placeOrder = async () => {
    return await authorizedMagentoClient(String(data?.token), "POST").request(
      PlaceOrder,
      {
        cartId,
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
