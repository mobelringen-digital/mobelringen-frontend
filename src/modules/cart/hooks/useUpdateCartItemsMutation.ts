import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CART_QUERY_KEY } from "@/components/cart/fetchCartService";
import { useCart } from "@/modules/cart/hooks/useCart";
import { UpdateCartItems } from "@/queries/cart.queries";
import { CartItemUpdateInput } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const useUpdateCartItemsMutation = () => {
  const queryClient = useQueryClient();
  const { cartId } = useCart();

  const updateCartItems = async (cartItems: Array<CartItemUpdateInput>) => {
    const data = await baseMagentoClient("POST").request(UpdateCartItems, {
      cartId,
      cartItems,
    });

    return data.updateCartItems;
  };

  return useMutation({
    mutationFn: ({ cartItems }: { cartItems: Array<CartItemUpdateInput> }) =>
      updateCartItems(cartItems),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};
