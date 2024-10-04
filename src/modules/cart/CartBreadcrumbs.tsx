"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const CartBreadcrumbs = () => {
  const [cookies] = useCookies();
  const preferredMethod = cookies.preferredMethod;

  return (
    <Breadcrumbs
      data={[
        {
          label: "Handlekurv",
          url: preferredMethod ? `/cart?method=${preferredMethod}` : "/cart",
        },
      ]}
    />
  );
};
