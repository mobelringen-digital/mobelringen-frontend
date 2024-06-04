import React from "react";

import Image from "next/image";
import Link from "next/link";

import { ChevronRight } from "@/components/icons/ChevronRight";
import { MenuQueryDocument } from "@/queries/menu.queries";
import { MenuQuery, MenuType } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

async function getMenuItems() {
  return await baseHygraphClient.request<MenuQuery>(MenuQueryDocument, {
    where: {
      menuLocation: MenuType.MobileMenuAdditionalLinks,
    },
  });
}

export default async function MobileMenuAdditionalLinks() {
  const items = await getMenuItems();
  const data = items.menus[0].links;

  return (
    <ul className="flex flex-col gap-5 my-8 py-8 border-t border-b border-b-cold-grey-dark border-t-cold-grey-dark">
      {data.map((link) => {
        if (link.__typename === "Link") {
          return (
            <li className="flex justify-between items-center" key={link.label}>
              <div className="flex items-center gap-2">
                {link.icon?.url ? (
                  <Image
                    width={24}
                    height={24}
                    src={link.icon?.url}
                    alt={link.label}
                  />
                ) : null}
                <Link href={link.url}>{link.label}</Link>
              </div>

              <ChevronRight />
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}
