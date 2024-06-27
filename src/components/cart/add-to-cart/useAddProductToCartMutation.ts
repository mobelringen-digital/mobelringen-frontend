import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CART_QUERY_KEY, CartCookie } from "@/components/cart/useCartQuery";
import { AddProductToCartDocument, CartItemInput } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const useAddProductToCartMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  const addProductToCart = async (
    cartItems: Array<CartItemInput> | CartItemInput,
    cartId?: string,
  ) => {
    const data = await baseMagentoClient("POST").request(
      AddProductToCartDocument,
      {
        cartId: cartId ?? cookies.cart,
        cartItems,
      },
    );

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
