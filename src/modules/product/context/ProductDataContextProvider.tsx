"use client";

import React from "react";

import {
  Availability,
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
  canBuyOnline: boolean;
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
  const stockData = stock?.getProductStock;
  const canBuyOnline =
    stockData?.online?.availability !== Availability.OutOfStock;

  return (
    <ProductDataContext.Provider
      value={{
        product,
        stores,
        selectedStore,
        stock,
        cart,
        canBuyOnline,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};

export { ProductDataContextProvider };
