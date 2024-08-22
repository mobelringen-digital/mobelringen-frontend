import React from "react";

import cx from "classnames";

import Image from "next/image";

import { ImageLinkPromotionBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkPromotionBubbleWrapper";
import { ImageLinkSalesBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkSalesBubbleWrapper";
import { CmsImageFragment } from "@/types";

interface Props {
  data: CmsImageFragment;
  className?: string;
}

export const CmsImage: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <div
        className={cx("rounded-3xl", {
          "mb-4 lg:mb-0": !!data.salesBubble,
          "mb-6 lg:mb-12": !!data.promotionBubble,
        })}
      >
        <Image
          className="rounded-3xl"
          src={data.image.url}
          width={data.width ?? data.image.width ?? 700}
          height={data.height ?? data.image.height ?? 700}
          alt={data.label}
        />
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
