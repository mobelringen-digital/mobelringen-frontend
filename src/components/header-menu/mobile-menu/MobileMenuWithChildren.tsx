"use client";

import React from "react";

import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { MobileMenuDropdown } from "@/components/header-menu/mobile-menu/MobileMenuDropdown";

interface Props {
  menu: any;
  children: React.ReactNode;
}

export const MobileMenuWithChildren: React.FC<Props> = ({ menu, children }) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <li>
      <button
        className="w-full flex justify-between items-center"
        onClick={() => setIsActive((prev) => !prev)}
      >
        <span className="text-2xl font-feature font-medium">{menu.label}</span>{" "}
        <ChevronRight />
      </button>
      <MobileMenuDropdown isActive={isActive} setIsActive={setIsActive}>
        {children}
      </MobileMenuDropdown>
    </li>
  );
};
