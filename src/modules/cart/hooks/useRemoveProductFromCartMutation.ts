import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CART_QUERY_KEY, CartCookie } from "@/components/cart/fetchCartService";
import { RemoveProductFromCart } from "@/queries/cart.queries";
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
