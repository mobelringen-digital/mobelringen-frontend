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
  variableWidth: true,
  adaptiveHeight: true,
  infinite: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        variableWidth: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const BlockImageLinksSlider: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <h2 className="text-xl lg:text-4xl font-medium font-feature mb-8 lg:mb-12">
        {data.title}
      </h2>
      <Slider className="product-slider" {...sliderConfig}>
        {data?.images.map((imageData, idx) => (
          <div key={idx} className="w-[260px]">
            {data && isTypename(imageData, ["ImageLink"]) ? (
              <Link href={imageData.url} className="relative group">
                <div className="rounded-2xl transition-all absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 pointer-events-none flex justify-start items-end">
                  <span className="font-medium text-2xl lg:text-4xl text-white font-feature p-4">
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
