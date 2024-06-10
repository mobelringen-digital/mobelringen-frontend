import React from "react";

import Slider from "react-slick";

import Image from "next/image";

import { ProductImage } from "@/modules/product/product-gallery/ProductImage";
import { ProductMediaGalleryFragment } from "@/types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  gallery: readonly ProductMediaGalleryFragment[];
  setPhotoIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ProductImageSlider: React.FC<Props> = ({
  gallery,
  setPhotoIndex,
}) => {
  const settings = {
    customPaging: function (i: number) {
      return (
        <button
          id="navigation-link"
          className="w-[96px] h-[96px] transition-all border border-warm-grey p-2 bg-warm-grey rounded-3xl !flex justify-center items-center cursor-pointer"
        >
          <Image
            width={96}
            height={96}
            src={gallery?.[i].url ?? ""}
            alt={gallery?.[i].label ?? ""}
          />
        </button>
      );
    },
    dots: true,
    dotsClass: "!flex gap-2 mt-2",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {gallery?.map((item, idx) =>
        item.url ? (
          <ProductImage
            key={idx}
            onClick={() => setPhotoIndex(idx)}
            image={item}
          />
        ) : null,
      )}
    </Slider>
  );
};
