"use client";

import React from "react";

export interface ProductDataContextType {
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
  productData: ProductData;
}

export const ProductDataContext = React.createContext<ProductDataContextType>(
  {} as ProductDataContextType,
);

type ProductData = {
  variant: string | null;
};

export const ProductDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [productData, setProductData] = React.useState<ProductData>({
    variant: null,
  });

  const contextData: ProductDataContextType = {
    setProductData,
    productData,
  };

  return (
    <ProductDataContext.Provider value={contextData}>
      {children}
    </ProductDataContext.Provider>
  );
};
