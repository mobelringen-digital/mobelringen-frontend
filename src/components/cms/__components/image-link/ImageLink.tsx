import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import {
  IMAGE_BUBBLE_SPACINGS,
  IMAGE_PROMOTION_SPACINGS,
} from "@/components/cms/__components/image/CmsImage";
import { ImageLinkPromotionBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkPromotionBubbleWrapper";
import { ImageLinkSalesBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkSalesBubbleWrapper";
import { CmsImageLinkFragment } from "@/types";
import {
  getPromotionBubbleSpacing,
  getSalesBubbleSpacing,
} from "@/utils/helpers";

interface Props {
  data: CmsImageLinkFragment;
  className?: string;
  imageStyle?: React.CSSProperties;
}

export const ImageLink: React.FC<Props> = ({ data, className, imageStyle }) => {
  return (
    <div className={cx("flex flex-col gap-2 group", className)}>
      <div
        className={cx(
          "relative rounded-3xl",
          IMAGE_BUBBLE_SPACINGS[getSalesBubbleSpacing(data.salesBubble)],
          IMAGE_PROMOTION_SPACINGS[
            getPromotionBubbleSpacing(data.promotionBubble)
          ],
          {
            "mb-6 lg:mb-12": !!data.promotionBubble,
          },
        )}
      >
        <div
          className={cx(
            "absolute left-0 right-0 top-0 bottom-0",
            "transition-all rounded-3xl bg-black opacity-0 group-hover:opacity-10 pointer-events-none",
          )}
        />
        <Link href={data.url}>
          <Image
            className="rounded-3xl"
            src={data.image.url}
            width={data.width ?? data.image.width ?? 700}
            height={data.height ?? data.image.height ?? 700}
            alt={data.label}
            style={imageStyle}
          />
        </Link>
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
