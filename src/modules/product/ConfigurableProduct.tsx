"use client";

import React from "react";

import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { ConfigurationInfo } from "@/modules/product/configurable-product/ConfigurationInfo";
import { Variants } from "@/modules/product/configurable-product/Variants";
import {
  ConfigurableProductFragment,
} from "@/types";
import { useProductData } from "@/modules/product/context/useProductData";

interface Props {
  configurableProductData: ConfigurableProductFragment | null;
}

export const ConfigurableProductPage: React.FC<Props> = ({configurableProductData}) => {
    const { product } = useProductData<ConfigurableProductFragment>();
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
}
