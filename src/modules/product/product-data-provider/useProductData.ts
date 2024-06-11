"use client";

import React from "react";

import {
  ProductDataContext,
  ProductDataContextType,
} from "@/modules/product/product-data-provider/ProductDataProvider";

const useProductData = (): ProductDataContextType =>
  React.useContext(ProductDataContext);

export { useProductData };
