import { useMutation, useQueryClient } from "@tanstack/react-query";
import update from "immutability-helper";
import { useCookies } from "react-cookie";

import { CART_QUERY_KEY, CartCookie } from "@/components/cart/fetchCartService";
import { RemoveProductFromCart } from "@/queries/cart.queries";
import { BaseCartFragment } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const useRemoveProductFromCartMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  const removeProductFromCart = async (cartItemId: number) => {
    const data = await baseMagentoClient("POST").request(
      RemoveProductFromCart,
      {
        cartId: cookies.cart,
        cartItemId,
      },
    );

    return data.removeItemFromCart?.cart;
  };

  return useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: number }) =>
      removeProductFromCart(cartItemId),
    onMutate: async ({ cartItemId }) => {
      const QUERY_KEY = [...CART_QUERY_KEY, cookies.cart];

      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

      const previousCart =
        queryClient.getQueryData<BaseCartFragment>(QUERY_KEY);

      if (!previousCart) {
        return;
      }

      const updatedCart = update(previousCart, {
        items: (items) =>
          items?.filter((item) => item?.id !== cartItemId.toString()),
      });

      queryClient.setQueryData(QUERY_KEY, updatedCart);

      return { previousCart };
    },
    onError: async (_, __, context?: { previousCart: BaseCartFragment }) => {
      await queryClient.setQueryData(CART_QUERY_KEY, context?.previousCart);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
