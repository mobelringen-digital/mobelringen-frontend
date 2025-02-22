import React from "react";

import cx from "classnames";

import { BannerPromoTextWrapper } from "@/components/cms/block-banner/BannerPromoTextWrapper";
import { BannerSalesBubbleWrapper } from "@/components/cms/block-banner/BannerSalesBubbleWrapper";
import { HotspotsWrapper } from "@/components/cms/block-banner/HotspotsWrapper";
import { BannerVariant, CmsBannerFragment } from "@/types";

interface Props {
  data: CmsBannerFragment;
  children?: React.ReactNode;
}

const VARIANTS: Record<BannerVariant, string> = {
  default: "h-[430px] lg:h-[820px] max-h-[calc(100vh-115px)] w-full",
  small: "h-[200px] lg:h-[320px] max-h-[calc(100vh-115px)] w-full",
};

export const Banner: React.FC<Props> = ({ data, children }) => {
  const { bannerImage, salesBubble } = data;

  if (!bannerImage) {
    return null;
  }

  return (
    <section
      className={cx(
        "relative bg-no-repeat bg-cover bg-center w-full",
        VARIANTS[data.variant],
      )}
      style={{
        backgroundImage: `url(${bannerImage.url})`,
      }}
    >
      {data.linkUrl ? (
        <a
          href={data.linkUrl}
          className="absolute top-0 left-0 bottom-0 right-0 z-10"
        />
      ) : null}
      {data.centerText ? (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
          <div className="text-white text-4xl lg:text-5xl font-feature">
            {data.centerText}
          </div>
        </div>
      ) : null}
      {data.hotspots && data.hotspots.length ? (
        <HotspotsWrapper
          className={VARIANTS[data.variant]}
          data={data.hotspots}
        />
      ) : null}
      {children}
      {data.promoText ? <BannerPromoTextWrapper data={data.promoText} /> : null}
      {salesBubble ? <BannerSalesBubbleWrapper data={salesBubble} /> : null}
    </section>
  );
};
