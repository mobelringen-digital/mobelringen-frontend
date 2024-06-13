"use client";

import React from "react";

import Vimeo from "@u-wave/react-vimeo";

import { ProductVideoFragmentFragment } from "@/types";

interface Props {
  video: ProductVideoFragmentFragment;
}

export const ProductVideo: React.FC<Props> = ({ video }) => {
  if (!video.video_content?.video_url) return null;

  return (
    <div className="relative p-4 lg:p-6 h-[380px] lg:h-[800px] bg-warm-grey rounded-3xl !flex justify-center items-center">
      <Vimeo
        width="100%"
        height="100%"
        className="w-full relative"
        video={video.video_content.video_url}
        responsive={true}
      />
    </div>
  );
};
