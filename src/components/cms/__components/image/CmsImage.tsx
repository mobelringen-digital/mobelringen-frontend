import React from "react";

import cx from "classnames";

import Image from "next/image";

import { ImageLinkPromotionBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkPromotionBubbleWrapper";
import { ImageLinkSalesBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkSalesBubbleWrapper";
import { CmsImageFragment } from "@/types";
import {
  getPromotionBubbleSpacing,
  getSalesBubbleSpacing,
} from "@/utils/helpers";

interface Props {
  data: CmsImageFragment;
  className?: string;
  imageStyle?: React.CSSProperties;
}

export const IMAGE_BUBBLE_SPACINGS: Record<number, string> = {
  1: "mb-4 lg:mb-0",
  2: "mb-6 lg:mb-0",
  3: "mb-8 lg:mb-0",
};

export const IMAGE_PROMOTION_SPACINGS: Record<number, string> = {
  1: "mb-[64px] lg:mb-0",
  2: "mb-[80px] lg:mb-0",
  3: "mb-[96px] lg:mb-0",
};

export const CmsImage: React.FC<Props> = ({ data, className, imageStyle }) => {
  if (!data.image.url) return null;

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <div
        className={cx(
          "rounded-3xl relative",
          IMAGE_BUBBLE_SPACINGS[getSalesBubbleSpacing(data.salesBubble)],
          IMAGE_PROMOTION_SPACINGS[
            getPromotionBubbleSpacing(data.promotionBubble)
          ],
          {
            "mb-6 lg:mb-12": !!data.promotionBubble,
          },
        )}
      >
        {data.image?.url ? (
          <Image
            className="rounded-3xl"
            src={data.image.url}
            width={data.width ?? data.image.width ?? 700}
            height={data.height ?? data.image.height ?? 700}
            alt={data.alt ?? data.label}
            style={imageStyle}
          />
        ) : null}

        {data.salesBubble ? (
          <ImageLinkSalesBubbleWrapper data={data.salesBubble} />
        ) : null}
        {data.promotionBubble ? (
          <ImageLinkPromotionBubbleWrapper data={data.promotionBubble} />
        ) : null}
      </div>
      {data.caption ? (
        <p className="text-left font-light text-xs lg:text-sm text-black">
          {data.caption}
        </p>
      ) : null}
    </div>
  );
};
