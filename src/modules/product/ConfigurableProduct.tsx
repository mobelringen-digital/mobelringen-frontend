import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { PurchaseBlock } from "@/modules/product/add-to-cart/PurchaseBlock";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { ConfigurationInfo } from "@/modules/product/configurable-product/ConfigurationInfo";
import { Variants } from "@/modules/product/configurable-product/Variants";
import { ConfigurableProductFragment } from "@/queries/configurable-product.queries";
import { BaseProductFragment } from "@/queries/product.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  productData: FragmentType<typeof ConfigurableProductFragment>;
}

export const ConfigurableProductPage: React.FC<Props> = ({ productData }) => {
  const product = useFragment(ConfigurableProductFragment, productData);
  const baseProductData = useFragment(BaseProductFragment, product);

  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout
        baseProductData={baseProductData}
        purchaseBlock={<PurchaseBlock />}
        configurationBlock={
          <div className="flex flex-col gap-2">
            <ConfigurationInfo
              // @ts-expect-error codegen error with array
              configurableOptionsData={product.configurable_options}
            />
            <Variants
              // @ts-expect-error codegen error with array
              variantData={product.variants}
            />
          </div>
        }
      />
    </ActiveProductDataContextProvider>
  );
};
