import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CartCookie } from "@/components/cart/fetchCartService";
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
      const today = new Date();
      const oneWeekFromNow = new Date(
        today.getTime() + 7 * 24 * 60 * 60 * 1000,
      );
      if (cartId) {
        setCookie("cart", cartId, {
          expires: oneWeekFromNow,
        });
      }
    },
  });
};
