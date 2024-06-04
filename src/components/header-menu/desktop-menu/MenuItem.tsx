import React, { Suspense } from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { MegaMenuCategoriesDropdown } from "@/components/header-menu/cms-components/MegaMenuCategoriesDropdown/MegaMenuCategoriesDropdown";
import { MegaMenuDropdown } from "@/components/header-menu/cms-components/MegaMenuDropdown/MegaMenuDropdown";
import { DropdownMenuProvider } from "@/components/header-menu/desktop-menu/DropdownMenuProvider";
import { MenuItemEntity } from "@/components/header-menu/types";
import { CmsMegamenuDropdownFragment } from "@/types";

interface Props {
  link: MenuItemEntity;
}

export const MenuItem: React.FC<Props> = ({ link }) => {
  if (link.__typename === "Link") {
    return (
      <li className="py-2">
        <CmsLink data={link} />
      </li>
    );
  }

  return (
    <Suspense>
      <DropdownMenuProvider title={(link as CmsMegamenuDropdownFragment).label}>
        {link.__typename === "MegaMenuDropdown" ? (
          <MegaMenuDropdown data={link} />
        ) : null}
        {link.__typename === "MegaMenuCategoriesDropdown" ? (
          <MegaMenuCategoriesDropdown /> // This is a placeholder, replace it with the actual component
        ) : null}
      </DropdownMenuProvider>
    </Suspense>
  );
};
