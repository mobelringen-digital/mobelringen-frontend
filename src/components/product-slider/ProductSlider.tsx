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
