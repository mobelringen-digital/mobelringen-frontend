import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsPopularProductsFragment } from "@/types";

interface Props {
  data: CmsPopularProductsFragment;
}

export const PopularProducts: React.FC<Props> = ({ data }) => {
  const { categoryId } = data;

  return (
    <ContainerLayout className="p-4 border border-red">
      Popular products {categoryId}
    </ContainerLayout>
  );
};
