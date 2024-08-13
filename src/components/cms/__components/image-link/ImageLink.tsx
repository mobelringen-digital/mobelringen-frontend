import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CmsImageLinkFragment } from "@/types";

interface Props {
  data: CmsImageLinkFragment;
}

export const ImageLink: React.FC<Props> = ({ data }) => {
  return (
    <div className="rounded-3xl">
      <Link href={data.url}>
        <Image
          className="rounded-3xl"
          src={data.image.url}
          width={data.image.width ?? 700}
          height={data.image.height ?? 700}
          alt={data.label}
        />
        {data.caption ? (
          <p className="text-left font-light text-xs lg:text-sm text-black mt-2 lg:mt-4">
            {data.caption}
          </p>
        ) : null}
      </Link>
    </div>
  );
};
