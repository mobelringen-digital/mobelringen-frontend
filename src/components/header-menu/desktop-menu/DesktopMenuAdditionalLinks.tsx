import React from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { MenuQueryDocument } from "@/queries/menu.queries";
import { MenuQuery, MenuType } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

async function getMenuItems() {
  return await baseHygraphClient.request<MenuQuery>(MenuQueryDocument, {
    where: {
      menuLocation: MenuType.MenuTopLinks,
    },
  });
}

export async function DesktopMenuAdditionalLinks() {
  const items = await getMenuItems();
  const data = items.menus[0].links;

  return (
    <ContainerLayout className="py-2 hidden lg:block bg-sand">
      <ul className="flex gap-6 items-center">
        {data.map((link, idx) => {
          if (link.__typename === "Link") {
            return (
              <li key={idx}>
                <CmsLink
                  className="flex justify-between w-full text-xs"
                  data={link}
                  iconHeight={20}
                  iconWidth={20}
                />
              </li>
            );
          }

          return null;
        })}
      </ul>
    </ContainerLayout>
  );
}
