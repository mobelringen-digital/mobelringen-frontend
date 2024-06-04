import React from "react";

import { BannerFragment } from "@/queries/cms.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  data: FragmentType<typeof BannerFragment>;
}

export const Banner: React.FC<Props> = ({ data }) => {
  const { bannerImage } = useFragment(BannerFragment, data);

  if (!bannerImage) {
    return null;
  }

  return (
    <div
      className="h-[430px] lg:h-[820px] max-h-screen w-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImage.url})`,
      }}
    />
  );
};
