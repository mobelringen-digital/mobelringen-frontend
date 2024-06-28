import { CartDocument, CartQuery, CartQueryVariables } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const CART_QUERY_KEY = ["cart"];
export type CartCookie = {
  cart: string;
};

export const fetchCartService = async (cartId: string) => {
  const data = await baseMagentoClient("GET").request<
    CartQuery,
    CartQueryVariables
  >(CartDocument, {
    cart_id: cartId,
  });

  return data.cart;
};
