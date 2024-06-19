"use client";

import React from "react";

import Slider from "react-slick";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductSliderSkeleton } from "@/components/product-slider/ProductSliderSkeleton";
import { BaseProductDataForCardFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { productSliderConfig } from "@/utils/lib/slick";

interface Props {
  title: string;
  data: Array<BaseProductDataForCardFragment | null> | null;
  isLoading?: boolean;
}

export const ProductSlider: React.FC<Props> = ({ title, data, isLoading }) => {
  if (isLoading) {
    return <ProductSliderSkeleton />;
  }

  if (data && data.length < 1) {
    return null;
  }

  if (data && data.length <= 4) {
    return (
      <div className="my-28 relative">
        <h2 className="text-2xl font-medium font-feature mb-4 lg:mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {data?.map((product, idx) => (
            <React.Fragment key={idx}>
              {product &&
              isTypename(product, ["SimpleProduct", "ConfigurableProduct"]) ? (
                <ProductCard product={product} />
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-28 product-slider relative">
      <h2 className="text-2xl font-medium font-feature mb-4 lg:mb-8">
        {title}
      </h2>
      <Slider {...productSliderConfig}>
        {data?.map((product, idx: number) => (
          <div key={idx} className="w-[260px]">
            {product &&
            isTypename(product, ["SimpleProduct", "ConfigurableProduct"]) ? (
              <ProductCard product={product} />
            ) : null}
          </div>
        ))}
      </Slider>
    </div>
  );
};
