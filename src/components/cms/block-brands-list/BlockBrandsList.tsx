import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
import { CmsBlockBrandsListFragment } from "@/types";

interface Props {
  data: CmsBlockBrandsListFragment;
}

export const BlockBrandsList: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <CmsBlockHeader
        title={data.title}
        hide={data.blockConfig?.hideBlockTitle ?? false}
      />
      <div className="grid grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-4">
        {data.brands.map((link, idx) => (
          <Link
            href={link.url}
            key={idx}
            className="group flex flex-col justify-centertext-lg lg:text-xl text-center items-center"
          >
            <div className="relative rounded-3xl bg-white px-6 lg:px-12 py-8 lg:py-12 mb-2 w-full flex justify-center items-center h-[168px]">
              <div
                className={cx(
                  "absolute left-0 right-0 top-0 bottom-0",
                  "transition-all rounded-3xl bg-black opacity-0 group-hover:opacity-10 pointer-events-none",
                )}
              />
              {link.image?.url ? (
                <Image
                  width={252}
                  height={120}
                  src={link.image?.url}
                  alt={link.brandName}
                />
              ) : null}
            </div>
            {link.brandName}
          </Link>
        ))}
      </div>
    </CmsBlockWrapper>
  );
};
