import React from "react";

import { Settings } from "react-slick";

import { ArrowNext } from "@/components/_ui/slider/arrows/ArrowNext";
import { ArrowPrev } from "@/components/_ui/slider/arrows/ArrowPrev";

export const productSliderConfig: Settings = {
  dots: true,
  swipeToSlide: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  initialSlide: 0,
  slidesToScroll: 1,
  nextArrow: <ArrowNext />,
  prevArrow: <ArrowPrev />,
  appendDots: (dots) => (
    <div
      className="mt-4"
      style={{
        bottom: "-50px",
      }}
    >
      <ul className="list-none flex mt-4 justify-center items-center">
        {dots}
      </ul>
    </div>
  ),
  customPaging: () => (
    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full border border-opacity-25 border-black" />
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
