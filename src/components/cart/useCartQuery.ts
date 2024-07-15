import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";

import {
  CART_QUERY_KEY,
  CartCookie,
  fetchCartService,
  fetchCustomerCartService,
} from "@/components/cart/fetchCartService";

export const useCartQuery = () => {
  const { data } = useSession();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  return useQuery({
    queryKey: [...CART_QUERY_KEY],
    queryFn: () =>
      data?.token
        ? fetchCustomerCartService(String(data.token))
        : fetchCartService(cookies.cart),
    enabled: !!cookies.cart || !!data?.token,
    staleTime: 3600,
  });
};
