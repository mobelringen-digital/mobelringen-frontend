"use client";

import React from "react";

import { once } from "lodash";

import {
  BaseCartFragment,
  BaseStoreFragment,
  GetProductStockQuery,
  ProductsStoresQuery,
} from "@/types";

export interface ProductDataContextType<T> {
  product: T | null;
  stores?: ProductsStoresQuery;
  selectedStore?: BaseStoreFragment | null;
  stock?: GetProductStockQuery;
  cart?: BaseCartFragment | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createProductDataContext = once(<T, _ = any>() =>
  React.createContext({} as ProductDataContextType<T>),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProductDataContextProvider = <_, T>({
  product,
  stores,
  selectedStore,
  stock,
  cart,
  children,
}: ProductDataContextType<T> & { children: React.ReactNode }) => {
  const ProductDataContext = createProductDataContext<T>();

  return (
    <ProductDataContext.Provider
      value={{
        product,
        stores,
        selectedStore,
        stock,
        cart,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};

export { ProductDataContextProvider };
