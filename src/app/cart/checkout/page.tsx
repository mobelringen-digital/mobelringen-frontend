import getCart from "@/components/cart/actions";
import { getToken } from "@/modules/auth/actions";
import { CheckoutPage } from "@/modules/checkout/CheckoutPage";

import { navigate } from "../../actions";

export default async function Checkout() {
  const cart = await getCart();
  const token = await getToken();

  if (token && !cart) {
    return navigate("/auth/login?callback=TOKEN_EXPIRED");
  }

  return <CheckoutPage cart={cart} />;
}
