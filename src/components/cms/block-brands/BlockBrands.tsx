"use client";

import React from "react";

import Slider, { Settings } from "react-slick";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
import { CmsBlockBrandsFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { productSliderConfig } from "@/utils/lib/slick";

interface Props {
  data: CmsBlockBrandsFragment;
}

const sliderConfig: Settings = {
  ...productSliderConfig,
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 3000,
  variableWidth: true,
  adaptiveHeight: true,
  infinite: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        variableWidth: false,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export const BlockBrands: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <CmsBlockHeader
        title={data.title}
        rightContent={
          <>
            {data.viewMoreLink?.url ? (
              <Button as={Link} href={data.viewMoreLink.url} color="secondary">
                {data.viewMoreLink.label}
              </Button>
            ) : null}
          </>
        }
      />

      <Slider className="brands-slider" {...sliderConfig}>
        {data?.brands.map((imageData, idx) => (
          <div key={idx} className="w-[260px]">
            {data && isTypename(imageData, ["ImageLink"]) ? (
              <Link href={imageData.url} className="relative group">
                <Image
                  className="rounded-2xl"
                  width={imageData.width ?? imageData.image.width ?? 175}
                  height={imageData.height ?? imageData.image.height ?? 175}
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
