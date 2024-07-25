import getCart from "@/components/cart/actions";
import { getToken } from "@/modules/auth/actions";
import { CartPage } from "@/modules/cart/CartPage";

import { navigate } from "../actions";

export default async function Cart() {
  const cart = await getCart();
  const token = await getToken();

  if (token && !cart) {
    return navigate("/auth/login?callback=TOKEN_EXPIRED");
  }

  return <CartPage data={cart} />;
}
