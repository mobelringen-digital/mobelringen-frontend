import React from "react";

import { MenuItem } from "@/components/header-menu/desktop-menu/MenuItem";
import { MenuQuery } from "@/types";

interface Props {
  data: MenuQuery;
}

export const DesktopMenu: React.FC<Props> = ({ data }) => {
  return (
    <ul className="gap-4 items-center font-base font-normal hidden lg:flex">
      {data.menus[0].links?.map((link, index) => {
        return <MenuItem link={link} key={index} />;
      })}
    </ul>
  );
};
