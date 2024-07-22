import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";

export const CartSuccessPage = () => {
  return (
    <ContainerLayout>
      <CartBreadcrumbs />
      <div className="flex justify-center text-center">
        <h1 className="font-feature text-4xl lg:text-5xl font-normal mb-8 lg:mb-12">
          Takk for kjøpet!
        </h1>
      </div>
    </ContainerLayout>
  );
};
