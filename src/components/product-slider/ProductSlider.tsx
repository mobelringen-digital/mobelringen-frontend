import React from "react";

import Slider from "react-slick";

import { ProductCard } from "@/components/product/ProductCard";
import { BaseProductFragment } from "@/types";
import { productSliderConfig } from "@/utils/lib/slick";

interface Props {
  title: string;
  data: Array<BaseProductFragment | null> | null;
}

export const ProductSlider: React.FC<Props> = ({ title, data }) => {
  if (data && data.length < 1) {
    return null;
  }

  if (data && data.length <= 4) {
    return (
      <div className="my-28">
        <h2 className="text-2xl font-medium font-feature mb-4 lg:mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {data?.map((product, idx) => (
            <React.Fragment key={idx}>
              {product &&
              (product.__typename === "SimpleProduct" ||
                product.__typename === "ConfigurableProduct") ? (
                <ProductCard product={product} />
              ) : null}
            </React.Fragment>
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
            {product &&
            (product.__typename === "SimpleProduct" ||
              product.__typename === "ConfigurableProduct") ? (
              <ProductCard product={product} />
            ) : null}
          </div>
        ))}
      </Slider>
    </div>
  );
};
