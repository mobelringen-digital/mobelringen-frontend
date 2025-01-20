"use client";

import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

import dynamic from "next/dynamic";

import { HotspotFragment } from "@/types";

const HotspotPopover = dynamic(() => import("./HotspotPopover"), {
  ssr: false,
});

interface Props {
  data: HotspotFragment;
}

export const Hotspot: React.FC<Props> = ({ data }) => {
  return (
    <Popover
      placement="right-end"
      classNames={{
        base: "mb-12",
        content: "rounded-3xl rounded-bl-none p-4",
      }}
    >
      <PopoverTrigger>
        <button
          aria-label="Hotspot"
          className="absolute group outline-0 group transition-all bg-black bg-opacity-30 rounded-full p-8 cursor-pointer"
          style={{
            left: `${data.horizontalPosition}%`,
            bottom: `${data.verticalPosition}%`,
          }}
        >
          <span className="absolute left-1/2 top-1/2 transition-all -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 group-hover:p-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <HotspotPopover sku={String(data.productSku)} />
      </PopoverContent>
    </Popover>
  );
};
