import React from "react";

import Slider from "react-slick";

import Image from "next/image";

import { PlayIcon } from "@/components/_ui/icons/PlayIcon";
import { ProductImage } from "@/modules/product/product-gallery/ProductImage";
import { ProductVideo } from "@/modules/product/product-gallery/ProductVideo";
import {
  ProductLabelFragment,
  ProductMediaGalleryFragment,
  ProductPriceRangeFragment,
} from "@/types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  gallery: readonly ProductMediaGalleryFragment[];
  setPhotoIndex: React.Dispatch<React.SetStateAction<number | null>>;
  priceRange?: ProductPriceRangeFragment | null;
  labels?: ProductLabelFragment | null;
}

export const ProductImageSlider: React.FC<Props> = ({
  gallery,
  setPhotoIndex,
  labels,
  priceRange,
}) => {
  const settings = {
    customPaging: function (i: number) {
      const item = gallery?.[i];

      return (
        <button
          id="navigation-link"
          className="relative w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] transition-all border border-warm-grey p-2 bg-warm-grey rounded-2xl !flex justify-center items-center cursor-pointer"
        >
          <Image
            width={96}
            height={96}
            src={item?.url ?? ""}
            alt={item?.label ?? ""}
          />

          {item?.__typename === "ProductVideo" ? (
            <div className="absolute rounded-2xl inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <PlayIcon width={35} height={35} />
            </div>
          ) : null}
        </button>
      );
    },
    dots: true,
    dotsClass: "!flex gap-2 mt-2",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  return (
    <Slider {...settings}>
      {gallery?.map((item, idx) =>
        item.url ? (
          <>
            {item.__typename === "ProductImage" ? (
              <ProductImage
                key={idx}
                onZoomClick={() => setPhotoIndex(idx)}
                image={item}
                labels={labels}
                priceRange={priceRange}
              />
            ) : null}

            {item.__typename === "ProductVideo" ? (
              <ProductVideo videoData={item} />
            ) : null}
          </>
        ) : null,
      )}
    </Slider>
  );
};
