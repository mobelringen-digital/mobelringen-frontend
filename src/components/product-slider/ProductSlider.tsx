"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";
import Slider from "react-slick";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductSliderSkeleton } from "@/components/product-slider/ProductSliderSkeleton";
import { BaseProductDataForCardFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { formatGTMCategories } from "@/utils/gtm";
import { productSliderConfig } from "@/utils/lib/slick";

interface Props {
  title: string;
  hideTitle?: boolean;
  data: Array<BaseProductDataForCardFragment | null> | null;
  isLoading?: boolean;
}

const viewItemListGTMEvent = (
  title: string,
  products?: Array<BaseProductDataForCardFragment | null> | null,
) => {
  return sendGTMEvent({
    event: "view_item_list",
    item_list_name: title,
    items: products?.map((product) => ({
      item_id: product?.sku,
      addable_to_cart: product?.addable_to_cart,
      item_name: product?.name,
      item_brand: product?.productBrand?.name,
      price: product?.price_range.maximum_price?.final_price.value,
      discount: product?.price_range.maximum_price?.discount?.amount_off,
      ...formatGTMCategories(
        product?.categories?.map((cat) => ({
          name: cat?.name,
        })),
      ),
    })),
  });
};

const selectItemGTMEvent = (product: BaseProductDataForCardFragment) => {
  if (!product) {
    return;
  }

  return sendGTMEvent({
    event: "view_item",
    currency: "NOK",
    value: product.price_range.maximum_price?.final_price?.value,
    addable_to_cart: (product as any).addable_to_cart,
    discount: product.price_range.maximum_price?.discount?.amount_off,
    label: product.productLabel?.custom?.join(", "),
    items: [
      {
        item_id: product.sku,
        addable_to_cart: product.addable_to_cart,
        item_name: product.name,
        item_brand: product.productBrand?.name,
        price: product.price_range.maximum_price?.final_price.value,
        discount: product.price_range.maximum_price?.discount?.amount_off,
        ...formatGTMCategories(
          product.categories?.map((cat) => ({
            name: cat?.name,
          })),
        ),
      },
    ],
  });
};

export const ProductSlider: React.FC<Props> = ({
  title,
  data,
  isLoading,
  hideTitle,
}) => {
  React.useEffect(() => {
    viewItemListGTMEvent(title, data);
  }, [data, title]);

  if (isLoading) {
    return <ProductSliderSkeleton />;
  }

  if (data && data.length < 1) {
    return null;
  }

  if (data && data.length <= 4) {
    return (
      <div className="mb-12 relative">
        {!hideTitle ? (
          <h2 className="text-xl lg:text-3xl font-medium font-feature mb-4 lg:mb-8">
            {title}
          </h2>
        ) : null}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {data?.map((product, idx) => (
            <React.Fragment key={idx}>
              {product &&
              isTypename(product, ["SimpleProduct", "ConfigurableProduct"]) ? (
                    <ProductCard
                      onClick={() => selectItemGTMEvent(product)}
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
      <Slider {...productSliderConfig}>
        {data?.map((product, idx: number) => (
          <div key={idx} className="w-[260px]">
            {product &&
            isTypename(product, ["SimpleProduct", "ConfigurableProduct"]) ? (
                  <ProductCard
                    onClick={() => selectItemGTMEvent(product)}
                    product={product}
                  />
                ) : null}
          </div>
        ))}
      </Slider>
    </div>
  );
};
