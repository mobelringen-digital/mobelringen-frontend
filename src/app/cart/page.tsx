import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { cookies } from "next/headers";

import { auth } from "@/auth/auth";
import {
  CART_QUERY_KEY,
  fetchCartService,
  fetchCustomerCartService,
} from "@/components/cart/fetchCartService";
import { CartPage } from "@/modules/cart/CartPage";

export default async function Cart() {
  const session = await auth();
  const queryClient = new QueryClient();
  const cookiesStore = cookies();
  const cartId = cookiesStore.get("cart");

  if (cartId) {
    await queryClient.prefetchQuery({
      queryKey: [...CART_QUERY_KEY],
      queryFn: () =>
        session?.token
          ? fetchCustomerCartService(session.token)
          : fetchCartService(String(cartId)),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartPage />
    </HydrationBoundary>
  );
}
