import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CmsLink } from "@/components/cms/__components/link/CmsLink";
import { CmsMegamenuDropdownFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  link: CmsMegamenuDropdownFragment;
}

export const MegaMenuDropdown: React.FC<Props> = ({ link }) => {
  if (link?.__typename !== "MegaMenuDropdown") return null;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {link.items.map((item, index) => (
        <li key={index}>
          {isTypename(item, ["ImageLink"]) ? (
            <Link aria-label={item.label} href={item.url}>
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
          {isTypename(item, ["Link"]) ? (
            <CmsLink className="text-base font-medium" link={item} />
          ) : null}
        </li>
      ))}
    </ul>
  );
};
