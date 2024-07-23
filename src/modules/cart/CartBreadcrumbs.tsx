import React from "react";

import { cookies } from "next/headers";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const CartBreadcrumbs = () => {
  const cookiesStore = cookies();
  const preferredMethod = cookiesStore.get("preferredMethod");

  return (
    <Breadcrumbs
      data={[
        {
          label: "Handlekurv",
          url: preferredMethod?.value
            ? `/cart?method=${preferredMethod?.value}`
            : "/cart",
        },
      ]}
    />
  );
};
