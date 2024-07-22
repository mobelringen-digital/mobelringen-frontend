import React from "react";

import getCart from "@/components/cart/actions";
import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { SimpleProductFragment } from "@/types";

interface Props {
  product: SimpleProductFragment;
}

export async function SimpleProductPage({ product }: Props) {
  const cart = await getCart();

  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout cart={cart} baseProductData={product} />
    </ActiveProductDataContextProvider>
  );
}
