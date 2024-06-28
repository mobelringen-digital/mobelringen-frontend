import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { cookies } from "next/headers";

import {
  CART_QUERY_KEY,
  fetchCartService,
} from "@/components/cart/fetchCartService";
import { CartPage } from "@/modules/cart/CartPage";

export default async function Cart() {
  const queryClient = new QueryClient();
  const cookiesStore = cookies();
  const cartId = cookiesStore.get("cart");

  if (cartId) {
    await queryClient.prefetchQuery({
      queryKey: [...CART_QUERY_KEY, cartId],
      queryFn: () => fetchCartService(String(cartId)),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartPage />
    </HydrationBoundary>
  );
}
