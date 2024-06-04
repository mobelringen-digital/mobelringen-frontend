import React, { Suspense } from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { DropdownMenuProvider } from "@/components/header-menu/menu-item/DropdownMenuProvider";
import { MegaMenuCategoriesDropdown } from "@/components/header-menu/menu-item/MegaMenuCategoriesDropdown/MegaMenuCategoriesDropdown";
import { MegaMenuDropdown } from "@/components/header-menu/menu-item/MegaMenuDropdown/MegaMenuDropdown";
import { MenuItemEntity } from "@/components/header-menu/types";

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
      <DropdownMenuProvider title={link.label}>
        {link.__typename === "MegaMenuDropdown" ? (
          <MegaMenuDropdown link={link} />
        ) : null}
        {link.__typename === "MegaMenuCategoriesDropdown" ? (
          <MegaMenuCategoriesDropdown /> // This is a placeholder, replace it with the actual component
        ) : null}
      </DropdownMenuProvider>
    </Suspense>
  );
};
