import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { ConfigurationInfo } from "@/modules/product/configurable-product/ConfigurationInfo";
import { Variants } from "@/modules/product/configurable-product/Variants";
import {
  BaseCartFragment,
  BaseStoreFragment,
  ConfigurableProductFragment,
  GetProductStockQuery,
  ProductReviewsFragment,
} from "@/types";

interface Props {
  product: ConfigurableProductFragment;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
  reviews?: ProductReviewsFragment | null;
}

export async function ConfigurableProductPage({
  product,
  cart,
  selectedStore,
  stock,
  reviews,
}: Props) {
  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout
        reviews={reviews}
        selectedStore={selectedStore}
        cart={cart}
        stock={stock}
        baseProductData={product}
        configurationBlock={
          <div className="flex flex-col gap-2">
            <ConfigurationInfo configurations={product.configurable_options} />
            <Variants variants={product.variants} />
          </div>
        }
      />
    </ActiveProductDataContextProvider>
  );
}
