"use client";

import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { ConfigurationInfo } from "@/modules/product/configurable-product/ConfigurationInfo";
import { Variants } from "@/modules/product/configurable-product/Variants";
import { useProductData } from "@/modules/product/context/useProductData";
import { ConfigurableProductFragment } from "@/types";

export const ConfigurableProductPage: React.FC = () => {
  const { product } = useProductData<ConfigurableProductFragment>();

  if (!product) {
    return null;
  }

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
