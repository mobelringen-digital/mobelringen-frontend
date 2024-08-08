"use client";

import React from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductsQuery } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  products?: ProductsQuery["products"];
}
export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products?.items?.map((product, idx) => {
        const isSupportedProductType =
          product &&
          isTypename(product, ["SimpleProduct", "ConfigurableProduct"]);
        return (
          <React.Fragment key={idx}>
            {isSupportedProductType ? (
              <ProductCard key={idx} product={product} />
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
};
