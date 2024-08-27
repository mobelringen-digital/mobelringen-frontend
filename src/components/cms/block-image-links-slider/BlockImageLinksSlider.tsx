"use client";

import React from "react";

import Slider, { Settings } from "react-slick";

import Image from "next/image";
import Link from "next/link";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockImageLinksSliderFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { productSliderConfig } from "@/utils/lib/slick";

interface Props {
  data: CmsBlockImageLinksSliderFragment;
}

const sliderConfig: Settings = {
  ...productSliderConfig,
  dots: false,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const BlockImageLinksSlider: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <h2 className="text-4xl font-medium font-feature mb-8 lg:mb-12">
        {data.title}
      </h2>
      <Slider className="product-slider" {...sliderConfig}>
        {data?.images.map((imageData, idx) => (
          <div key={idx} className="w-[260px]">
            {data && isTypename(imageData, ["ImageLink"]) ? (
              <Link href={imageData.url} className="relative">
                <div className="rounded-2xl absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-20 pointer-events-none flex justify-start items-end">
                  <span className="font-medium text-4xl text-white font-feature p-4">
                    {imageData.label}
                  </span>
                </div>
                <Image
                  className="rounded-2xl"
                  width={imageData.width ?? imageData.image.width ?? 480}
                  height={imageData.height ?? imageData.image.height ?? 320}
                  src={imageData.image.url}
                  alt={imageData.label}
                />
              </Link>
            ) : null}
          </div>
        ))}
      </Slider>
    </CmsBlockWrapper>
  );
};
