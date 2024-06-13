import React from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { DesktopMenuAdditionalLinksBlock } from "@/components/header-menu/desktop-menu/additional-links/DesktopMenuAdditionalLinksBlock";
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
    <ContainerLayout className="py-2 hidden lg:block">
      <div className="flex items-center justify-between">
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            {item.__typename === "LinkBlock" ? (
              <DesktopMenuAdditionalLinksBlock block={item} />
            ) : null}

            {item.__typename === "Link" ? (
              <CmsLink
                className="flex justify-between w-full text-xs"
                link={item}
                iconHeight={20}
                iconWidth={20}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </ContainerLayout>
  );
}
