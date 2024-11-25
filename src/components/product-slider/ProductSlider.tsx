"use client";

import React from "react";

import cx from "classnames";
import Slider, { Settings } from "react-slick";

import { CARD_SIZE, ProductCard } from "@/components/product/ProductCard";
import { ProductSliderSkeleton } from "@/components/product-slider/ProductSliderSkeleton";
import { BaseProductDataForCardFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { productSliderConfig } from "@/utils/lib/slick";

interface Props {
  title: string;
  hideTitle?: boolean;
  data: Array<BaseProductDataForCardFragment | null> | null;
  isLoading?: boolean;
  hasAddToCart?: boolean;
  sliderConfig?: Settings;
  preferSlider?: boolean;
  nonSliderClassName?: string;
  cardHeight?: keyof typeof CARD_SIZE;
}

export const ProductSlider: React.FC<Props> = ({
  title,
  data,
  isLoading,
  hideTitle,
  hasAddToCart,
  sliderConfig,
  preferSlider,
  nonSliderClassName,
  cardHeight,
}) => {
  if (isLoading) {
    return <ProductSliderSkeleton />;
  }

  if (data && data.length < 1) {
    return null;
  }

  const config = { ...productSliderConfig, ...sliderConfig };

  if (data && data.length <= 4 && !preferSlider) {
    return (
      <div className="mb-12 relative">
        {!hideTitle ? (
          <h2 className="text-xl lg:text-3xl font-medium font-feature mb-4 lg:mb-8">
            {title}
          </h2>
        ) : null}
        <div
          className={cx(
            {
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8":
                !nonSliderClassName,
            },
            nonSliderClassName,
          )}
        >
          {data?.map((product, idx) => (
            <React.Fragment key={idx}>
              {product &&
              isTypename(product, ["SimpleProduct", "ConfigurableProduct"]) ? (
                    <ProductCard
                      cardHeight={cardHeight}
                      hasAddToCart={hasAddToCart}
                      product={product}
                    />
                  ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 product-slider relative">
      {!hideTitle ? (
        <h2 className="text-xl lg:text-3xl font-medium font-feature mb-4 lg:mb-8">
          {title}
        </h2>
      ) : null}
      <Slider {...config}>
        {data?.map((product, idx: number) => (
          <div key={idx} className="!w-[260px]">
            {product &&
            isTypename(product, ["SimpleProduct", "ConfigurableProduct"]) ? (
                  <ProductCard
                    cardHeight={cardHeight}
                    hasAddToCart={hasAddToCart}
                    product={product}
                  />
                ) : null}
          </div>
        ))}
      </Slider>
    </div>
  );
};
