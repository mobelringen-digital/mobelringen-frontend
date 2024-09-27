import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PageTitle } from "@/components/typography/PageTitle";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";
import { MaskedOrderFragment } from "@/types";

interface Props {
  order?: MaskedOrderFragment | null;
}

export const CartSuccessPage: React.FC<Props> = ({ order }) => {
  return (
    <ContainerLayout>
      <CartBreadcrumbs />
      <PageTitle>Takk for kjøpet!</PageTitle>
    </ContainerLayout>
  );
};
