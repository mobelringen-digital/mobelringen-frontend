import React from "react";

import cx from "classnames";

import { SalesBubbleWrapper } from "@/components/cms/banner/SalesBubbleWrapper";
import { BannerVariant, CmsBannerFragment } from "@/types";

interface Props {
  data: CmsBannerFragment;
  children?: React.ReactNode;
}

const VARIANTS: Record<BannerVariant, string> = {
  default: "h-[430px] lg:h-[820px] max-h-screen w-full",
  small: "h-[200px] lg:h-[320px] max-h-screen w-full",
};

export const Banner: React.FC<Props> = ({ data, children }) => {
  const { bannerImage, salesBubble } = data;

  if (!bannerImage) {
    return null;
  }

  return (
    <div
      className={cx(
        "relative bg-no-repeat bg-cover bg-center",
        VARIANTS[data.variant],
      )}
      style={{
        backgroundImage: `url(${bannerImage.url})`,
      }}
    >
      {children}
      {salesBubble ? <SalesBubbleWrapper data={salesBubble} /> : null}
    </div>
  );
};
