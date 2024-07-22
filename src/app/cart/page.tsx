import getCart from "@/components/cart/actions";
import { CartPage } from "@/modules/cart/CartPage";

export default async function Cart() {
  const cart = await getCart();

  return <CartPage data={cart} />;
}
