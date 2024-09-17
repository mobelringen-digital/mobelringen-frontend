import getCart from "@/components/cart/actions";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { updateCartItemsInStore } from "@/components/store-selector/actions";
import { getToken, logout } from "@/modules/auth/actions";
import { CartPage } from "@/modules/cart/CartPage";

import { navigate } from "../actions";

export default async function Cart() {
  const cart = await getCart();
  const token = await getToken();
  await updateCartItemsInStore();

  if (token && !cart) {
    return logout().then(() => navigate("/auth/login?callback=TOKEN_EXPIRED"));
  }

  return (
    <>
      <CartPage data={cart} />
      <StaticPageContent url="/cart" />
    </>
  );
}
