"use client";

import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import {
  CART_QUERY_KEY,
  CartCookie,
  fetchCartService,
  fetchCustomerCartService,
} from "@/components/cart/fetchCartService";
import { useSession } from "@/utils/hooks/useSession";

export const useCartQuery = () => {
  const { token } = useSession();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  return useQuery({
    queryKey: [...CART_QUERY_KEY],
    queryFn: () =>
      token
        ? fetchCustomerCartService(String(token))
        : fetchCartService(cookies.cart),
    enabled: !!cookies.cart || !!token,
    staleTime: 3600,
  });
};
