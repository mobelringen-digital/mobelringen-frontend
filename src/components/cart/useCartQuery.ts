import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CartDocument, CartQuery, CartQueryVariables } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const CART_QUERY_KEY = ["cart"];
export type CartCookie = {
  cart: string;
};

export const fetchCart = async (cartId: string) => {
  const data = await baseMagentoClient("GET").request<
    CartQuery,
    CartQueryVariables
  >(CartDocument, {
    cart_id: cartId,
  });

  return data.cart;
};

export const useCartQuery = () => {
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  return useQuery({
    queryKey: [...CART_QUERY_KEY, cookies.cart],
    queryFn: () => fetchCart(cookies.cart),
    enabled: !!cookies.cart,
    staleTime: 3600,
  });
};
