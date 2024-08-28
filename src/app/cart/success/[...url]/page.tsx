import { revalidateTag } from "next/cache";

import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { CartSuccessPage } from "@/modules/cart/success/CartSuccessPage";

export default function CartSuccess() {
  revalidateTag("cart");

  return (
    <>
      <CartSuccessPage />
      <StaticPageContent url="/cart/success" />
    </>
  );
}
