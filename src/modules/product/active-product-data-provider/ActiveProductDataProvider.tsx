"use client";

import React from "react";

import { ConfigurableProductVariantsFragment } from "@/types";

export interface ActiveProductDataContextType {
  setActiveProductVariant: React.Dispatch<React.SetStateAction<ProductData>>;
  activeProductVariant: ProductData;
}

export const ActiveProductDataContext =
  React.createContext<ActiveProductDataContextType>(
    {} as ActiveProductDataContextType,
  );

type ProductData = {
  variant?: ConfigurableProductVariantsFragment | null;
};

export const ActiveProductDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeProductVariant, setActiveProductVariant] =
    React.useState<ProductData>({
      variant: null,
    });

  const contextData: ActiveProductDataContextType = {
    setActiveProductVariant,
    activeProductVariant,
  };

  return (
    <ActiveProductDataContext.Provider value={contextData}>
      {children}
    </ActiveProductDataContext.Provider>
  );
};
