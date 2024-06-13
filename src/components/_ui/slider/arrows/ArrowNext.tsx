import React from "react";

import { CustomArrowProps } from "react-slick";

import { ArrowRight } from "@/components/_ui/icons/ArrowRight";

export const ArrowNext: React.FC<CustomArrowProps> = (
  props,
): React.JSX.Element => {
  return (
    <button
      {...props}
      className="absolute right-0 z-20 top-1/2 translate-x-1/2 rounded-full content-none w-12 h-12 bg-white p-2 !flex items-center justify-center"
    >
      <ArrowRight />
    </button>
  );
};
