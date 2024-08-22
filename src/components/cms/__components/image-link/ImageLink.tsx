import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { ImageLinkPromotionBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkPromotionBubbleWrapper";
import { ImageLinkSalesBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkSalesBubbleWrapper";
import { CmsImageLinkFragment } from "@/types";

interface Props {
  data: CmsImageLinkFragment;
  className?: string;
}

export const ImageLink: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cx("flex flex-col gap-2 group", className)}>
      <div
        className={cx("relative rounded-3xl", {
          "mb-4 lg:mb-0": !!data.salesBubble,
          "mb-6 lg:mb-12": !!data.promotionBubble,
        })}
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
            width={data.image.width ?? 700}
            height={data.image.height ?? 700}
            alt={data.label}
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
