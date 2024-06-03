import React, { Suspense } from "react";

import Link from "next/link";

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
        <Link href={link?.url ?? "#"}>{link.label}</Link>
      </li>
    );
  }

  return (
    <Suspense>
      <DropdownMenuProvider link={link}>
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
