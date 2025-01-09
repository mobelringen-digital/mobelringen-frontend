import React from "react";

import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { ConfigurationInfo } from "@/modules/product/configurable-product/ConfigurationInfo";
import { Variants } from "@/modules/product/configurable-product/Variants";
import {
  BaseCartFragment,
  BaseProductFragment,
  BaseStoreFragment,
  ConfigurableProductFragment,
  GetProductStockQuery,
} from "@/types";

interface Props {
  configurableProductData: ConfigurableProductFragment | null;
  product: BaseProductFragment;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
}

export async function ConfigurableProductPage({
  configurableProductData,
  product,
  cart,
  selectedStore,
  stock,
}: Props) {
  const activeProductVariant = configurableProductData?.variants?.find(
    (variant) => variant?.product?.sku === product.sku,
  );

  return (
    <BaseProductLayout
      selectedStore={selectedStore}
      cart={cart}
      stock={stock}
      baseProductData={product}
      configurationBlock={
        <div className="flex flex-col gap-2">
          <ConfigurationInfo
            activeProductVariant={activeProductVariant}
            configurations={configurableProductData?.configurable_options}
          />
          <Variants variants={configurableProductData?.variants} />
        </div>
      }
    />
  );
}
