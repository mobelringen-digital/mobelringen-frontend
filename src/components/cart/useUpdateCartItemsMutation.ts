import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CART_QUERY_KEY, CartCookie } from "@/components/cart/fetchCartService";
import { UpdateCartItems } from "@/queries/cart.queries";
import { CartItemUpdateInput } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const useUpdateCartItemsMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  const updateCartItems = async (
    cartItems: Array<CartItemUpdateInput>,
    cartId?: string,
  ) => {
    const data = await baseMagentoClient("POST").request(UpdateCartItems, {
      cartId: cartId ?? cookies.cart,
      cartItems,
    });

    return data.updateCartItems;
  };

  return useMutation({
    mutationFn: ({
      cartItems,
      cartId,
    }: {
      cartItems: Array<CartItemUpdateInput>;
      cartId?: string;
    }) => updateCartItems(cartItems, cartId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
