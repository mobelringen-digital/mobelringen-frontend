"use client";

import React from "react";

import { ProductDataContext } from "@/modules/product/context/ProductDataContextProvider";

const useProductData = () => React.useContext(ProductDataContext);

export { useProductData };
