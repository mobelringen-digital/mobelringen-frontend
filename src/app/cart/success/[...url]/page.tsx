import { revalidateTag } from "next/cache";

import { CartSuccessPage } from "@/modules/cart/success/CartSuccessPage";

export default function CartSuccess() {
  revalidateTag("cart");

  return <CartSuccessPage />;
}
