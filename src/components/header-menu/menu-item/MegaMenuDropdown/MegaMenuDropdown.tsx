import React from "react";

import Image from "next/image";
import Link from "next/link";

import { MenuItemEntity } from "@/components/header-menu/types";

interface Props {
  link: MenuItemEntity;
}

export const MegaMenuDropdown: React.FC<Props> = ({ link }) => {
  if (link?.__typename !== "MegaMenuDropdown") return null;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {link.items.map((item, index) => (
        <li key={index}>
          <Link href={item.url}>
            {item.__typename === "ImageLink" ? (
              <>
                <Image
                  width={380}
                  height={250}
                  src={item.image.url}
                  alt={item.label}
                  className="rounded-3xl transition duration-300 ease-in-out hover:shadow-xl"
                />
                <span className="text-xl font-medium">{item.label}</span>
              </>
            ) : (
              <span className="text-base font-medium">{item.label}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};
