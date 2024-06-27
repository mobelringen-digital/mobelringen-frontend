import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CartCookie } from "@/components/cart/useCartQuery";
import { CreateEmptyCartDocument } from "@/queries/cart.queries";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const useCreateEmptyCartMutation = () => {
  const [_cookies, setCookie] = useCookies<"cart", CartCookie>(["cart"]);

  const createEmptyCart = async () => {
    const data = await baseMagentoClient("POST").request(
      CreateEmptyCartDocument,
      {},
    );
    return data.createEmptyCart;
  };

  return useMutation({
    mutationFn: createEmptyCart,
    onSuccess: async (cartId) => {
      if (cartId) {
        setCookie("cart", cartId);
      }
    },
  });
};
