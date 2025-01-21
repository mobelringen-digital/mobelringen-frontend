import React from "react";

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
    <BaseProductLayout
      selectedStore={selectedStore}
      stock={stock}
      cart={cart}
      baseProductData={product}
    />
  );
}
