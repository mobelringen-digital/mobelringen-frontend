import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PopularProductsFragment } from "@/queries/cms.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  data: FragmentType<typeof PopularProductsFragment>;
}

export const PopularProducts: React.FC<Props> = ({ data }) => {
  const { categoryId } = useFragment(PopularProductsFragment, data);

  return (
    <ContainerLayout className="p-4 border border-red">
      Popular products {categoryId}
    </ContainerLayout>
  );
};
