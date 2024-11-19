import React, { Suspense } from "react";

import { revalidateTag } from "next/cache";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CartErrorPage } from "@/modules/cart/error/CartErrorPage";

export default function CartError() {
  revalidateTag("cart");

  return (
    <Suspense fallback={<PageTopLoader />}>
      <CartErrorPage />
    </Suspense>
  );
}
