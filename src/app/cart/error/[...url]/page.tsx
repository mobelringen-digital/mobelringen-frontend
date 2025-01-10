import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CartErrorPage } from "@/modules/cart/error/CartErrorPage";

export default function CartError() {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <CartErrorPage />
    </Suspense>
  );
}
