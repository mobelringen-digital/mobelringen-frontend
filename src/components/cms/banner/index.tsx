import React from "react";

import { SalesBubbleWrapper } from "@/components/cms/banner/SalesBubbleWrapper";
import { CmsBannerFragment } from "@/types";

interface Props {
  data: CmsBannerFragment;
}

export const Banner: React.FC<Props> = ({ data }) => {
  const { bannerImage, salesBubble } = data;

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
