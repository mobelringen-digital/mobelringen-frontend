import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { CmsMegamenuDropdownFragment } from "@/queries/menu.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  data: FragmentType<typeof CmsMegamenuDropdownFragment>;
}

export const MegaMenuDropdown: React.FC<Props> = ({ data }) => {
  const link = useFragment(CmsMegamenuDropdownFragment, data);
  if (link?.__typename !== "MegaMenuDropdown") return null;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {link.items.map((item, index) => (
        <li key={index}>
          {item.__typename === "ImageLink" ? (
            <Link href={item.url}>
              <Image
                width={380}
                height={250}
                src={item.image.url}
                alt={item.label}
                className="rounded-3xl transition duration-300 ease-in-out hover:shadow-xl"
              />
              <span className="text-lg lg:text-xl font-medium">
                {item.label}
              </span>
            </Link>
          ) : null}
          {item.__typename === "Link" ? (
            <CmsLink className="text-base font-medium" data={item} />
          ) : null}
        </li>
      ))}
    </ul>
  );
};
