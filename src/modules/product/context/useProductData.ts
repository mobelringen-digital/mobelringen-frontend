"use client";

import React from "react";

import { createProductDataContext } from "@/modules/product/context/ProductDataContextProvider";
const useProductData = <T>() => React.useContext(createProductDataContext<T>());

export { useProductData };
