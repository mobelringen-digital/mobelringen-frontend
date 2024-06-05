import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CmsLinkFragment } from "@/queries/menu.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  data: FragmentType<typeof CmsLinkFragment>;
}

export const FooterIconLink: React.FC<Props> = ({ data }) => {
  const link = useFragment(CmsLinkFragment, data);

  return (
    <Link key={link.url} href={link.url}>
      <div className="flex flex-col justify-center text-center items-center gap-2 font-light">
        {link.icon?.url ? (
          <Image src={link.icon?.url} width={48} height={48} alt={link.label} />
        ) : null}
        <span>{link.label}</span>
      </div>
    </Link>
  );
};
