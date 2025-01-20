import React from "react";

import { Hotspot } from "@/components/cms/__components/hotspot/Hotspot";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { HotspotFragment } from "@/types";

interface Props {
  data: HotspotFragment[];
}

export const HotspotsWrapper: React.FC<Props> = ({ data }) => {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 w-full">
      <ContainerLayout className="h-[430px] lg:h-[820px] max-h-[calc(100vh-115px)] relative z-20">
        {data.map((hotspot, index) => (
          <Hotspot data={hotspot} key={index} />
        ))}
      </ContainerLayout>
    </div>
  );
};
