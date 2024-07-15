import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const CheckoutBreadcrumbs = () => {
  return (
    <Breadcrumbs
      data={[
        {
          label: "Handlekurv",
          url: "/cart",
        },
      ]}
    />
  );
};
