import React from "react";

import { MenuIcon } from "@/components/icons/MenuIcon";
import { NavigationIcon } from "@/components/icons/NavigationIcon";
import { MenuQuery } from "@/types";

interface Props {
  data: MenuQuery;
}

export const MobileMenu: React.FC<Props> = () => {
  return (
    <div className="flex gap-1 items-center md:hidden">
      <button>
        <MenuIcon />
      </button>
      <button>
        <NavigationIcon />
      </button>
    </div>
  );
};
