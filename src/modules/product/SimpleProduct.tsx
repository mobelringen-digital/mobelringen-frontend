import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { BaseCartFragment, SimpleProductFragment } from "@/types";

interface Props {
  product: SimpleProductFragment;
  cart?: BaseCartFragment | null;
}

export async function SimpleProductPage({ product, cart }: Props) {
  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout cart={cart} baseProductData={product} />
    </ActiveProductDataContextProvider>
  );
}
