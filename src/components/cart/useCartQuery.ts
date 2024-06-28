import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import {
  CART_QUERY_KEY,
  CartCookie,
  fetchCartService,
} from "@/components/cart/fetchCartService";

export const useCartQuery = () => {
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);

  return useQuery({
    queryKey: [...CART_QUERY_KEY, cookies.cart],
    queryFn: () => fetchCartService(cookies.cart),
    enabled: !!cookies.cart,
    staleTime: 3600,
  });
};
