"use client";

import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const CartBreadcrumbs = () => {
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
