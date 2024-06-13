import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { ConfigurationInfo } from "@/modules/product/configurable-product/ConfigurationInfo";
import { Variants } from "@/modules/product/configurable-product/Variants";
import { ConfigurableProductFragment } from "@/types";

interface Props {
  product: ConfigurableProductFragment;
}

export const ConfigurableProductPage: React.FC<Props> = ({ product }) => {
  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout
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
};
