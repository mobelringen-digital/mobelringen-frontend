import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { ProductsList } from "@/modules/category/category/ProductsList";
import { CategoryItemEntity } from "@/modules/category/types";

interface Props {
  category: CategoryItemEntity;
}

export const CategoryPage: React.FC<Props> = ({ category }) => {
  return (
    <ContainerLayout>
      <ProductsList categoryId={category?.id} />
    </ContainerLayout>
  );
};
