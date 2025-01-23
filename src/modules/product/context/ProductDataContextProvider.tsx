"use client";

import React from "react";

import {
  BaseCartFragment,
  BaseProductFragment,
  BaseStoreFragment,
  GetProductStockQuery,
  ProductsStoresQuery,
} from "@/types";

export interface ProductDataContextType {
  product: BaseProductFragment;
  stores?: ProductsStoresQuery;
  selectedStore?: BaseStoreFragment | null;
  stock?: GetProductStockQuery;
  cart?: BaseCartFragment | null;
}

export const ProductDataContext = React.createContext<ProductDataContextType>(
  {} as ProductDataContextType,
);

const ProductDataContextProvider: React.FC<{
  product: BaseProductFragment;
  stores?: ProductsStoresQuery;
  selectedStore?: BaseStoreFragment | null;
  stock?: GetProductStockQuery;
  cart?: BaseCartFragment | null;
  children: React.ReactNode;
}> = ({ children, product, stores, selectedStore, stock, cart }) => {
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
