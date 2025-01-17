"use client";

import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { useProductData } from "@/modules/product/context/useProductData";
import { SimpleProductFragment } from "@/types";

export const SimpleProductPage: React.FC = () => {
  const { product } = useProductData<SimpleProductFragment>();

  if (!product) {
    return null;
  }

  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout baseProductData={product} />
    </ActiveProductDataContextProvider>
  );
};
