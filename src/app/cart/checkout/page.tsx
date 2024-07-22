import getCart from "@/components/cart/actions";
import { CheckoutPage } from "@/modules/checkout/CheckoutPage";

export default async function Checkout() {
  const cart = await getCart();

  return <CheckoutPage cart={cart} />;
}
