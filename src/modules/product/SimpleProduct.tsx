import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import {
  BaseCartFragment,
  GetProductStockQuery,
  SimpleProductFragment,
} from "@/types";

interface Props {
  product: SimpleProductFragment;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
}

export async function SimpleProductPage({ product, cart, stock }: Props) {
  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout stock={stock} cart={cart} baseProductData={product} />
    </ActiveProductDataContextProvider>
  );
}
