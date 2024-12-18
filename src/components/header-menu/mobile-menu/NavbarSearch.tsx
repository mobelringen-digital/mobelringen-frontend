"use client";

import React, { Suspense } from "react";

import cx from "classnames";

import { MenuSearch } from "@/components/_ui/icons/figma/MenuSearch";
import { Search } from "@/components/header-menu/Search";
import { useDetectOutsideClick } from "@/utils/hooks/useDetectOutsideClick";

export const NavbarSearch = () => {
  const ref = React.useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(ref, false);

  return (
    <div ref={ref as any} className="z-10 flex items-nceter lg:hidden">
      <button onClick={() => setIsActive((prev) => !prev)}>
        <MenuSearch />
      </button>
      <div
        className={cx("absolute top-[75px] left-0 right-0 transition-all", {
          "opacity-100 visible translate-y-0 border-t border-dark-grey border-opacity-10 z-30":
            isActive,
          "opacity-0 invisible -translate-x-1/2 -z-100": !isActive,
        })}
      >
        <div className="bg-white w-full py-4 px-2">
          <Suspense fallback={null}>
            <Search clearAfterSubmit={true} searchIconPosition="right" />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
