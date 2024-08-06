import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PageTitle } from "@/components/typography/PageTitle";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";

export const CartErrorPage = () => {
  return (
    <ContainerLayout>
      <CartBreadcrumbs />
      <PageTitle>Noe gikk galt</PageTitle>
    </ContainerLayout>
  );
};
