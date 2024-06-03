import React from "react";

import Link from "next/link";

import { Maybe, ProductInterface } from "@/types";
import { generateProductUrl } from "@/utils/helpers";

import { AddToCart } from "../cart/add-to-cart/AddToCart";

interface Props {
  product: Maybe<ProductInterface>;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  if (!product) return null;

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex overflow-hidden rounded-xl"
        href={generateProductUrl(product)}
      >
        {product.image?.url ? (
          <img
            className="object-cover"
            src={product.image.url}
            alt="product image"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link href={generateProductUrl(product)}>
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900 flex">
              <span className="mr-1">
                {product.price_range?.minimum_price.regular_price.value}
              </span>
              <span>
                {product.price_range?.minimum_price.regular_price.currency}
              </span>
            </span>
          </p>
        </div>
        <AddToCart />
      </div>
    </div>
  );
};
