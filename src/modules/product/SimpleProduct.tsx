"use client";

import React from "react";

import { BaseProductLayout } from "@/modules/product/BaseProductLayout";
import { useProductData } from "@/modules/product/context/useProductData";

export const SimpleProductPage: React.FC = () => {
  const { product } = useProductData();

  if (!product) {
    return null;
  }

  return <BaseProductLayout baseProductData={product} />;
};
