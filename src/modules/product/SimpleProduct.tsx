import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import {
  BaseCartFragment,
  BaseStoreFragment,
  GetProductStockQuery,
  SimpleProductFragment,
} from "@/types";

interface Props {
  product: SimpleProductFragment;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
}

export async function SimpleProductPage({
  product,
  cart,
  stock,
  selectedStore,
}: Props) {
  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout
        selectedStore={selectedStore}
        stock={stock}
        cart={cart}
        baseProductData={product}
      />
    </ActiveProductDataContextProvider>
  );
}
