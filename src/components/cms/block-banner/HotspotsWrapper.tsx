import React from "react";

import cx from "classnames";

import { Hotspot } from "@/components/cms/__components/hotspot/Hotspot";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { HotspotFragment } from "@/types";

interface Props {
  data: HotspotFragment[];
  className?: string;
}

export const HotspotsWrapper: React.FC<Props> = ({ data, className }) => {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 w-full">
      <ContainerLayout className={cx("relative z-20", className)}>
        {data.map((hotspot, index) => (
          <Hotspot data={hotspot} key={index} />
        ))}
      </ContainerLayout>
    </div>
  );
};
