import React from "react";

import { ActiveProductDataContextProvider } from "@/modules/product/active-product-data-provider/ActiveProductDataProvider";
import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { BaseProductFragment } from "@/queries/product.queries";
import { SimpleProductFragment } from "@/queries/simple-product.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  productData: FragmentType<typeof SimpleProductFragment>;
}

export const SimpleProductPage: React.FC<Props> = ({ productData }) => {
  const product = useFragment(SimpleProductFragment, productData);
  const baseProductData = useFragment(BaseProductFragment, product);

  return (
    <ActiveProductDataContextProvider>
      <BaseProductLayout baseProductData={baseProductData} />
    </ActiveProductDataContextProvider>
  );
};
