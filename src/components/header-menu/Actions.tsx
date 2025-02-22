import React, { Suspense } from "react";

import Link from "next/link";

import { Profile } from "@/components/_ui/icons/figma/Profile";
import { HeaderCartButton } from "@/components/cart/HeaderCartButton";
import { NavbarSearch } from "@/components/header-menu/mobile-menu/NavbarSearch";
import { Search } from "@/components/header-menu/Search";

export const Actions = () => {
  return (
    <ul className="flex items-center z-50 gap-4">
      <li className="flex items-center">
        <NavbarSearch />
      </li>
      <li className="hidden lg:list-item">
        <Suspense fallback={null}>
          <Search />
        </Suspense>
      </li>
      <li>
        <Link aria-label="Profile" href="/account">
          <Profile width={24} height={24} />
        </Link>
      </li>
      {/*<li>*/}
      {/*  <Favorite width={24} height={24} />*/}
      {/*</li>*/}
      <li>
        <HeaderCartButton />
      </li>
    </ul>
  );
};
