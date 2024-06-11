import React from "react";

import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { CmsLink } from "@/components/cms/link/CmsLink";
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
      {data.map((link, idx) => {
        if (link.__typename === "Link") {
          return (
            <li key={idx}>
              <CmsLink
                className="flex justify-between w-full"
                data={link}
                afterIcon={<ChevronRight />}
              />
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}
