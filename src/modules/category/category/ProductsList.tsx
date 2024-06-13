"use client";

import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductsQuery } from "@/modules/category/category/useProductsQuery";

interface Props {
  categoryId?: number | null;
}
export const ProductsList: React.FC<Props> = ({ categoryId }) => {
  const { data, isLoading } = useProductsQuery(categoryId);

  if (isLoading) {
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
      {data?.map((product, idx) => (
        <React.Fragment key={idx}>
          {product?.__typename === "SimpleProduct" ||
          product?.__typename === "ConfigurableProduct" ? (
              <ProductCard key={idx} product={product} />
            ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};
