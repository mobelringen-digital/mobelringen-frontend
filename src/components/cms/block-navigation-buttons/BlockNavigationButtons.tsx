import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockNavigationButtonsFragment } from "@/types";

interface Props {
  data: CmsBlockNavigationButtonsFragment;
}

export const BlockNavigationButtons: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <div className="grid grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-3">
        {data.links.map((link, idx) => (
          <Link
            href={link.url}
            key={idx}
            className="relative group flex gap-2 flex-col justify-center rounded-3xl text-lg lg:text-xl text-center items-center bg-white px-6 lg:px-12 py-8 lg:py-12"
          >
            <div
              className={cx(
                "absolute left-0 right-0 top-0 bottom-0",
                "transition-all rounded-3xl bg-black opacity-0 group-hover:opacity-10 pointer-events-none",
              )}
            />
            {link.icon?.url ? (
              <Image
                width={48}
                height={38}
                src={link.icon?.url}
                alt={link.label}
              />
            ) : null}
            {link.label}
          </Link>
        ))}
      </div>
    </CmsBlockWrapper>
  );
};
