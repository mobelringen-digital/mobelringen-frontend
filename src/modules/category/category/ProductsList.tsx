"use client";

import React from "react";

import { useProductsQuery } from "@/modules/category/category/useProductsQuery";

interface Props {
  categoryId?: number | null;
}
export const ProductsList: React.FC<Props> = ({ categoryId }) => {
  const { data } = useProductsQuery(categoryId);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
