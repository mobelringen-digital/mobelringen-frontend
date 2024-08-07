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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
      {products?.items?.map((product, idx) => (
        <React.Fragment key={idx}>
          {product &&
          isTypename(product, ["SimpleProduct", "ConfigurableProduct"]) ? (
            <ProductCard key={idx} product={product} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};
