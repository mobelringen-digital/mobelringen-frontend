"use client";

import React from "react";

import { PurchaseBlock } from "@/modules/product/add-to-cart/PurchaseBlock";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
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

  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(
    null,
  );

  return (
    <BaseProductLayout
      baseProductData={baseProductData}
      purchaseBlock={<PurchaseBlock />}
      configurationBlock={
        <>
          <div className="flex gap-2"> Selected: {selectedVariant}</div>
          <Variants
            // @ts-expect-error codegen error with array
            variantData={product.variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </>
      }
    />
  );
};
