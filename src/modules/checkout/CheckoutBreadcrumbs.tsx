import React from "react";

import { cookies } from "next/headers";

import { Breadcrumbs } from "@/components/breadcrumbs";

export async function CheckoutBreadcrumbs() {
  const cookiesStore = await cookies();
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
}
