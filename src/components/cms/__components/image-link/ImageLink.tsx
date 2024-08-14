import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { ImageLinkSalesBubbleWrapper } from "@/components/cms/__components/image-link/ImageLinkSalesBubbleWrapper";
import { CmsImageLinkFragment } from "@/types";

interface Props {
  data: CmsImageLinkFragment;
}

export const ImageLink: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cx("relative rounded-3xl", {
          "mb-4 lg:mb-0": !!data.salesBubble,
        })}
      >
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
      </div>
      {data.caption ? (
        <p className="text-left font-light text-xs lg:text-sm text-black">
          {data.caption}
        </p>
      ) : null}
    </div>
  );
};
