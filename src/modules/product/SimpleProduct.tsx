import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import {
  BaseCartFragment,
  BaseStoreFragment,
  GetProductStockQuery,
  ProductReviewsFragment,
  SimpleProductFragment,
} from "@/types";

interface Props {
  product: SimpleProductFragment;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
  reviews?: ProductReviewsFragment | null;
}

export async function SimpleProductPage({
  product,
  cart,
  stock,
  selectedStore,
  reviews,
}: Props) {
  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout
        reviews={reviews}
        selectedStore={selectedStore}
        stock={stock}
        cart={cart}
        baseProductData={product}
      />
    </ActiveProductDataContextProvider>
  );
}
