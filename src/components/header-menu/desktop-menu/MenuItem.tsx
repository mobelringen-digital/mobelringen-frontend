import React, { Suspense } from "react";

import { CmsLink } from "@/components/cms/__components/link/CmsLink";
import { MegaMenuCategoriesDropdown } from "@/components/header-menu/cms-components/MegaMenuCategoriesDropdown/MegaMenuCategoriesDropdown";
import { MegaMenuDropdown } from "@/components/header-menu/cms-components/MegaMenuDropdown/MegaMenuDropdown";
import { DropdownMenuProvider } from "@/components/header-menu/desktop-menu/DropdownMenuProvider";
import { MenuItemEntity } from "@/components/header-menu/types";
import { CmsMegamenuDropdownFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  link: MenuItemEntity;
}

export const MenuItem: React.FC<Props> = ({ link }) => {
  if (isTypename(link, ["Link"])) {
    return (
      <li className="py-2">
        <CmsLink link={link} />
      </li>
    );
  }

  return (
    <Suspense>
      <DropdownMenuProvider title={(link as CmsMegamenuDropdownFragment).label}>
        {isTypename(link, ["MegaMenuDropdown"]) ? (
          <MegaMenuDropdown link={link} />
        ) : null}
        {isTypename(link, ["MegaMenuCategoriesDropdown"]) ? (
          <MegaMenuCategoriesDropdown /> // This is a placeholder, replace it with the actual component
        ) : null}
      </DropdownMenuProvider>
    </Suspense>
  );
};
