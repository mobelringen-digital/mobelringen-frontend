import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CART_QUERY_KEY, CartCookie } from "@/components/cart/fetchCartService";
import { useCart } from "@/modules/cart/hooks/useCart";
import { AddProductToCartDocument, CartItemInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const useAddProductToCartMutation = () => {
  const { user } = useCart();
  const queryClient = useQueryClient();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  const addProductToCart = async (
    cartItems: Array<CartItemInput> | CartItemInput,
    cartId?: string,
  ) => {
    const data = await authorizedMagentoClient(
      String(user?.token),
      "POST",
    ).request(AddProductToCartDocument, {
      cartId: cartId ?? cookies.cart,
      cartItems,
    });

    return data.addProductsToCart;
  };

  return useMutation({
    mutationFn: ({
      cartItems,
      cartId,
    }: {
      cartItems: Array<CartItemInput> | CartItemInput;
      cartId?: string;
    }) => addProductToCart(cartItems, cartId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
