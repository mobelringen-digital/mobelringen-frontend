"use client";

import React from "react";

import {
  Availability,
  BaseCartFragment,
  BaseProductFragment,
  BaseStoreFragment,
  GetProductStockQuery,
  ProductsStoresQuery,
  ShowroomStockFragment,
} from "@/types";

export interface ProductDataContextType {
  product: BaseProductFragment;
  stores?: ProductsStoresQuery;
  selectedStore?: BaseStoreFragment | null;
  stock?: GetProductStockQuery;
  cart?: BaseCartFragment | null;
  canBuyOnline: boolean;
  showroomStocks?: ShowroomStockFragment | null;
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
  showroomStocks?: ShowroomStockFragment | null;
  children: React.ReactNode;
}> = ({
  children,
  product,
  stores,
  selectedStore,
  stock,
  cart,
  showroomStocks,
}) => {
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
        showroomStocks,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};

export { ProductDataContextProvider };
