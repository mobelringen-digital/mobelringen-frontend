import getCart from "@/components/cart/actions";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { Debugger } from "@/components/Debugger";
import { updateCartItemsInStore } from "@/components/store-selector/actions";
import { CartPage } from "@/modules/cart/CartPage";

export default async function Cart() {
  const cart = await getCart();
  await updateCartItemsInStore();

  return (
    <>
      <CartPage data={cart} />
      <StaticPageContent url="/cart" />
      <Debugger data={cart} />
    </>
  );
}
