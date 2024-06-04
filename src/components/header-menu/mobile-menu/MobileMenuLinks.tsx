import React from "react";

import { ChevronRight } from "@/components/icons/ChevronRight";
import { MenuQuery } from "@/types";

interface Props {
  data: MenuQuery;
}

export const MobileMenuLinks: React.FC<Props> = ({ data }) => {
  return (
    <ul className="flex gap-4 flex-col list-none">
      {data.menus[0].links?.map((menu, idx) => {
        return (
          <li className="flex justify-between items-center" key={idx}>
            <span className="text-2xl font-feature font-medium">
              {menu.label}
            </span>{" "}
            <ChevronRight />
          </li>
        );
      })}
    </ul>
  );
};
