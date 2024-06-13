import React from "react";

import Slider from "react-slick";

import { ProductCard } from "@/components/product/ProductCard";
import { BaseProductFragment } from "@/queries/product.queries";
import { FragmentType } from "@/types/schema";
import { productSliderConfig } from "@/utils/lib/slick";

interface Props<T> {
  title: string;
  data: Array<Partial<T | null>>;
}

export function ProductSlider<T>({ title, data }: Props<T>) {
  if (!data.length) {
    return null;
  }

  if (data.length <= 4) {
    return (
      <div className="my-28">
        <h2 className="text-2xl font-medium font-feature mb-4 lg:mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {data?.map((product, idx) => (
            <ProductCard
              key={idx}
              productData={product as FragmentType<typeof BaseProductFragment>}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-28">
      <h2 className="text-2xl font-medium font-feature mb-4 lg:mb-8">
        {title}
      </h2>
      <Slider {...productSliderConfig}>
        {data?.map((product, idx: number) => (
          <div key={idx} className="w-[260px]">
            <ProductCard
              productData={product as FragmentType<typeof BaseProductFragment>}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
