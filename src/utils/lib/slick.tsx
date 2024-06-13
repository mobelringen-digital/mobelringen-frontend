import React from "react";

import { Settings } from "react-slick";

import { ArrowNext } from "@/components/_ui/slider/arrows/ArrowNext";
import { ArrowPrev } from "@/components/_ui/slider/arrows/ArrowPrev";

export const productSliderConfig: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <ArrowNext />,
  prevArrow: <ArrowPrev />,
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
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
