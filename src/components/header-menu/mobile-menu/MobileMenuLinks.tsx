import React from "react";

import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { CmsLink } from "@/components/cms/link/CmsLink";
import { MegaMenuCategoriesDropdown } from "@/components/header-menu/cms-components/MegaMenuCategoriesDropdown/MegaMenuCategoriesDropdown";
import { MegaMenuDropdown } from "@/components/header-menu/cms-components/MegaMenuDropdown/MegaMenuDropdown";
import { MobileMenuWithChildren } from "@/components/header-menu/mobile-menu/MobileMenuWithChildren";
import { MenuQuery } from "@/types";

interface Props {
  data: MenuQuery;
}

export const MobileMenuLinks: React.FC<Props> = ({ data }) => {
  return (
    <ul className="flex gap-4 flex-col list-none">
      {data.menus[0].links?.map((menu, idx) => {
        if (menu.__typename === "Link") {
          return (
            <CmsLink
              className="flex justify-between items-center text-2xl font-feature font-medium"
              data={menu}
              key={idx}
              afterIcon={<ChevronRight />}
            />
          );
        }

        if (menu.__typename === "MegaMenuCategoriesDropdown") {
          return (
            <MobileMenuWithChildren key={idx} menu={menu}>
              <MegaMenuCategoriesDropdown />
            </MobileMenuWithChildren>
          );
        }

        if (menu.__typename === "MegaMenuDropdown") {
          return (
            <MobileMenuWithChildren key={idx} menu={menu}>
              <MegaMenuDropdown data={menu} />
            </MobileMenuWithChildren>
          );
        }

        return null;
      })}
    </ul>
  );
};
