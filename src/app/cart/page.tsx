import getCart from "@/components/cart/actions";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { Debugger } from "@/components/Debugger";
import { updateCartItemsInStore } from "@/components/store-selector/actions";
import { getCustomerDetails } from "@/modules/account/account/actions";
import { getToken } from "@/modules/auth/actions";
import { CartPage } from "@/modules/cart/CartPage";
import { BaseCartFragment } from "@/types";

import { navigate } from "../actions";

export default async function Cart() {
  const cart = await getCart();
  const customer = await getCustomerDetails();
  const token = await getToken();
  await updateCartItemsInStore();

  if (!!token && !customer) {
    return navigate("/auth/login?token=EXPIRED");
  }

  return (
    <>
      <CartPage data={cart as BaseCartFragment} />
      <StaticPageContent url="/cart" />
      <Debugger data={cart} />
    </>
  );
}
