import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { getIPapers } from "@/components/cms/block-catalog/actions";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
import { CmsBlockCatalogFragment } from "@/types";

interface Props {
  data: CmsBlockCatalogFragment;
}

export async function BlockCatalog({ data }: Props) {
  const links = await getIPapers();

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <CmsBlockHeader
        hide={data.blockConfig?.hideBlockTitle ?? false}
        title={data.title}
      />
      <div className="grid grid-cols-2 gap-4 lg:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {links?.map((link, idx) => (
          <Link
            href={link?.url ?? ""}
            key={idx}
            className="relative h-[400px] p-4 group flex flex-col justify-between rounded-3xl text-lg lg:text-xl"
          >
            <div
              className={cx(
                "absolute left-0 right-0 top-0 bottom-0",
                "transition-all rounded-2xl bg-black opacity-0 group-hover:opacity-10 pointer-events-none",
              )}
            />
            {link?.image ? (
              <Image
                width={250}
                height={500}
                src={link.image}
                alt={link.id ?? ""}
              />
            ) : null}
            <span>{link?.name}</span>
          </Link>
        ))}
      </div>
    </CmsBlockWrapper>
  );
}
