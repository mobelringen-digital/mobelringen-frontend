import React from "react";

import Link from "next/link";

import { Favorite } from "@/components/_ui/icons/figma/Favorite";
import { Profile } from "@/components/_ui/icons/figma/Profile";
import { HeaderCartButton } from "@/components/cart/HeaderCartButton";
import { SearchInput } from "@/components/search/SearchInput";

export const Actions = () => {
  return (
    <ul className="flex items-center z-50 gap-4">
      <li className="hidden lg:list-item">
        <SearchInput />
      </li>
      <li>
        <Link href="/account">
          <Profile width={24} height={24} />
        </Link>
      </li>
      <li>
        <Favorite width={24} height={24} />
      </li>
      <li>
        <HeaderCartButton />
      </li>
    </ul>
  );
};
