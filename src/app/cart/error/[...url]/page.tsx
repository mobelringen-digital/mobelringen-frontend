import { revalidateTag } from "next/cache";

import { CartErrorPage } from "@/modules/cart/error/CartErrorPage";

export default function CartError() {
  revalidateTag("cart");

  return <CartErrorPage />;
}
