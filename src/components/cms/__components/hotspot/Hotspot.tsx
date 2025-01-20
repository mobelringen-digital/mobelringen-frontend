"use client";

import React from "react";

import dynamic from "next/dynamic";

import { HotspotFragment } from "@/types";

const HotspotPopover = dynamic(() => import("./HotspotPopover"), {
  ssr: false,
});

interface Props {
  data: HotspotFragment;
}

export const Hotspot: React.FC<Props> = ({ data }) => {
  const [showPopover, setShowPopover] = React.useState(false);

  return (
    <button
      onClick={() => setShowPopover((prev) => !prev)}
      onMouseLeave={() => setShowPopover(false)}
      className="absolute group transition-all items-center bg-black bg-opacity-30 rounded-full p-8 cursor-pointer"
      style={{
        left: `${data.horizontalPosition}%`,
        bottom: `${data.verticalPosition}%`,
      }}
    >
      <div className="absolute transition-all left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-4 w-4 group-hover:h-6 group-hover:w-6 rounded-full">
        {showPopover && data.productSku ? (
          <HotspotPopover sku={data.productSku} />
        ) : null}
      </div>
    </button>
  );
};
