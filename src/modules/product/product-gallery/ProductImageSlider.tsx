import React from "react";

import Slider from "react-slick";

import Image from "next/image";

import { PlayIcon } from "@/components/_ui/icons/PlayIcon";
import { ProductImage } from "@/modules/product/product-gallery/ProductImage";
import { ProductVideo } from "@/modules/product/product-gallery/ProductVideo";
import { BaseProductFragment } from "@/types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  product: BaseProductFragment;
  setPhotoIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ProductImageSlider: React.FC<Props> = ({
  product,
  setPhotoIndex,
}) => {
  const settings = {
    customPaging: function (i: number) {
      const item = product.media_gallery?.[i];

      return (
        <button
          id="navigation-link"
          className="relative w-[64px] h-[64px] lg:w-[96px] lg:h-[96px] transition-all border border-warm-grey p-2 bg-warm-grey rounded-2xl !flex justify-center items-center cursor-pointer"
        >
          <Image
            className="object-contain w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]"
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
    dotsClass: "!flex gap-2 mt-2 flex-wrap",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  return (
    <Slider {...settings}>
      {product.media_gallery?.map((item, idx) => (
        <React.Fragment key={idx}>
          {item?.url ? (
            <>
              {item.__typename === "ProductImage" ? (
                <ProductImage
                  onZoomClick={() => setPhotoIndex(idx)}
                  product={product}
                />
              ) : null}

              {item.__typename === "ProductVideo" ? (
                <ProductVideo video={item} />
              ) : null}
            </>
          ) : null}
        </React.Fragment>
      ))}
    </Slider>
  );
};
