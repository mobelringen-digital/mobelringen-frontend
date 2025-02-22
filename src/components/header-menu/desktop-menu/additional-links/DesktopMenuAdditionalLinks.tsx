import React from "react";

import { CmsLink } from "@/components/cms/__components/link/CmsLink";
import { DesktopMenuAdditionalLinksBlock } from "@/components/header-menu/desktop-menu/additional-links/DesktopMenuAdditionalLinksBlock";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import {getSelectedStore} from "@/components/store-selector/actions";
import { StoreSelector } from "@/components/store-selector/StoreSelector";
import { MenuQueryDocument } from "@/queries/menu.queries";
import { MenuQuery, MenuType } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { baseHygraphClient } from "@/utils/lib/graphql";

async function getMenuItems() {
  return await baseHygraphClient("GET").request<MenuQuery>(MenuQueryDocument, {
    where: {
      menuLocation: MenuType.MenuTopLinks,
    },
  });
}

export async function DesktopMenuAdditionalLinks() {
  const items = await getMenuItems();
  const selectedStore = await getSelectedStore();
  const data = items.menus[0].links;

  return (
    <ContainerLayout className="py-2 hidden lg:block">
      <div className="flex items-center justify-between">
        <StoreSelector selectedStore={selectedStore} />
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            {isTypename(item, ["LinkBlock"]) ? (
              <DesktopMenuAdditionalLinksBlock block={item} />
            ) : null}

            {isTypename(item, ["Link"]) ? (
              <CmsLink
                className="text-xs"
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
