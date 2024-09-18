"use client";

import React from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { BaseProductDataForCardFragment, ProductsQuery } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  products?: ProductsQuery["products"];
  onItemClick?: (product: BaseProductDataForCardFragment) => void;
}
export const ProductsList: React.FC<Props> = ({ products, onItemClick }) => {
  return (
    <>
      {products?.items?.map((product, idx) => {
        const isSupportedProductType =
          product &&
          isTypename(product, ["SimpleProduct", "ConfigurableProduct"]);
        return (
          <React.Fragment key={idx}>
            {isSupportedProductType ? (
              <ProductCard onClick={onItemClick} key={idx} product={product} />
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
};
