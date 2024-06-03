"use client";

import React from "react";

import { usePathname, useSearchParams } from "next/navigation";

import { DropdownArrow } from "@/components/header-menu/menu-item/DropdownArrow";
import { DropdownContentWrapper } from "@/components/header-menu/menu-item/DropdownContentWrapper";
import { MenuItemEntity } from "@/components/header-menu/types";
import { useDetectOutsideClick } from "@/utils/hooks/useDetectOutsideClick";

interface Props {
  link: MenuItemEntity;
  children: React.ReactNode;
}

export const DropdownMenuProvider: React.FC<Props> = ({ children, link }) => {
  const ref = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(ref, false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    setIsActive(false);
    // Listen for route changes and close the dropdown
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <li className="py-2" ref={ref}>
      <button
        onClick={() => setIsActive((prev) => !prev)}
        className="cursor-pointer flex items-center"
      >
        {link.label}
        <DropdownArrow isActive={isActive} />
      </button>
      <DropdownContentWrapper isActive={isActive}>
        {children}
      </DropdownContentWrapper>
    </li>
  );
};
