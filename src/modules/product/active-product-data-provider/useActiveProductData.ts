"use client";

import React from "react";

import {
  ActiveProductDataContext,
  ActiveProductDataContextType,
} from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";

const useActiveProductData = (): ActiveProductDataContextType =>
  React.useContext(ActiveProductDataContext);

export { useActiveProductData };
