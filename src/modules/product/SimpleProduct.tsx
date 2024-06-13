import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { SimpleProductFragment } from "@/types";

interface Props {
  product: SimpleProductFragment;
}

export const SimpleProductPage: React.FC<Props> = ({ product }) => {
  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout baseProductData={product} />
    </ActiveProductDataContextProvider>
  );
};
