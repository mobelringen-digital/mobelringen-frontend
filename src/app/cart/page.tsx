import React, {Suspense} from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import getCart from "@/components/cart/actions";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { Debugger } from "@/components/Debugger";
import { updateCartItemsInStore } from "@/components/store-selector/actions";
import { CartPage } from "@/modules/cart/CartPage";
import { BaseCartFragment } from "@/types";

export default async function Cart() {
  const cart = await getCart();
  await updateCartItemsInStore();

  return (
    <Suspense fallback={<PageTopLoader />}>
      <CartPage data={cart as BaseCartFragment} />
      <StaticPageContent url="/cart" />
      <Debugger data={cart} />
    </Suspense>
  );
}
