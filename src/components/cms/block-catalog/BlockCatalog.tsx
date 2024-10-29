import React from "react";

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
      <div className="grid grid-cols-2 gap-4 lg:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {links?.map((link, idx) => (
          <Link
            href={link?.url ?? ""}
            key={idx}
            className="relative group flex gap-2 flex-col justify-center rounded-3xl text-lg lg:text-xl"
          >
            {link?.image ? (
              <Image
                width={250}
                height={500}
                src={link.image}
                alt={link.id ?? ""}
              />
            ) : null}
          </Link>
        ))}
      </div>
    </CmsBlockWrapper>
  );
}
