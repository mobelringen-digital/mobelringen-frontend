"use client";

import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductsQuery } from "@/modules/category/category/useProductsQuery";

interface Props {
  categoryId?: number | null;
}
export const ProductsList: React.FC<Props> = ({ categoryId }) => {
  const { data, isLoading } = useProductsQuery(categoryId);

  if (isLoading) {
    return (
      <ContainerLayout className="flex justify-center items-center min-h-[30vh]">
        <Loader />
      </ContainerLayout>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
      {data?.map((product, idx) => (
        // @ts-expect-error codegen error with array
        <ProductCard key={idx} productData={product} />
      ))}
    </div>
  );
};
