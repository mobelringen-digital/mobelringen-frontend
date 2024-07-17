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
import {
  CUSTOMER_QUERY_KEY,
  fetchCustomer,
} from "@/modules/account/services/fetchCustomer";
import { CheckoutPage } from "@/modules/checkout/CheckoutPage";

export default async function Checkout() {
  const session = await auth();
  const queryClient = new QueryClient();
  const cookiesStore = cookies();
  const cartId = cookiesStore.get("cart");

  if (cartId || session?.token) {
    await queryClient.prefetchQuery({
      queryKey: [...CART_QUERY_KEY],
      queryFn: () =>
        session?.token
          ? fetchCustomerCartService(session.token)
          : fetchCartService(String(cartId)),
    });
  }

  if (session?.token) {
    await queryClient.prefetchQuery({
      queryKey: [...CUSTOMER_QUERY_KEY],
      queryFn: () => fetchCustomer(session.token),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CheckoutPage />
    </HydrationBoundary>
  );
}
