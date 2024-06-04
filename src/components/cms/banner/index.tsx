import React from "react";

import { SalesBubbleWrapper } from "@/components/cms/banner/SalesBubbleWrapper";
import { BannerFragment } from "@/queries/cms.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  data: FragmentType<typeof BannerFragment>;
}

export const Banner: React.FC<Props> = ({ data }) => {
  const { bannerImage, salesBubble } = useFragment(BannerFragment, data);

  if (!bannerImage) {
    return null;
  }

  return (
    <div
      className="relative h-[430px] lg:h-[820px] max-h-screen w-full bg-no-repeat bg-cover bg-center mb-24 lg:mb-12"
      style={{
        backgroundImage: `url(${bannerImage.url})`,
      }}
    >
      {salesBubble ? <SalesBubbleWrapper data={salesBubble} /> : null}
    </div>
  );
};
