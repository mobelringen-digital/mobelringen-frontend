"use client";

import React from "react";

import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { ConfigurationInfo } from "@/modules/product/configurable-product/ConfigurationInfo";
import { Variants } from "@/modules/product/configurable-product/Variants";
import { useProductData } from "@/modules/product/context/useProductData";
import { ConfigurableProductFragment } from "@/types";

interface Props {
  configurableProductData: ConfigurableProductFragment | null;
}

export const ConfigurableProductPage: React.FC<Props> = ({
  configurableProductData,
}) => {
  const { product } = useProductData();
  const activeProductVariant = configurableProductData?.variants?.find(
    (variant) => variant?.product?.sku === product?.sku,
  );

  if (!product) {
    return null;
  }

  return (
    <BaseProductLayout
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
};
