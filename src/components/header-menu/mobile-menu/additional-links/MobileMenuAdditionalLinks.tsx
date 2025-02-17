import React from "react";

import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { CmsLink } from "@/components/cms/__components/link/CmsLink";
import { MobileMenuAdditionalLinksBlock } from "@/components/header-menu/mobile-menu/additional-links/MobileMenuAdditionalLinksBlock";
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

export default async function MobileMenuAdditionalLinks() {
  const items = await getMenuItems();
  const selectedStore = await getSelectedStore();
  const data = items.menus[0].links;

  return (
    <div className="flex flex-col mt-8 border-b border-b-cold-grey-dark">
      {data.map((item, idx) => (
        <React.Fragment key={idx}>
          {isTypename(item, ["LinkBlock"]) ? (
            <MobileMenuAdditionalLinksBlock block={item} />
          ) : null}

          {isTypename(item, ["Link"]) ? (
            <CmsLink
              className="flex justify-between w-full"
              link={item}
              afterIcon={<ChevronRight />}
            />
          ) : null}
        </React.Fragment>
      ))}
      <StoreSelector selectedStore={selectedStore} />
    </div>
  );
}
