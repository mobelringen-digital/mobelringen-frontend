import React from "react";

import Link from "next/link";

import { CartIcon } from "@/components/_ui/icons/CartIcon";
import { Favorite } from "@/components/_ui/icons/figma/Favorite";
import { Profile } from "@/components/_ui/icons/figma/Profile";
import { SearchIcon } from "@/components/_ui/icons/SearchIcon";
import { Input } from "@/components/_ui/input/Input";

export const Actions = () => {
  return (
    <ul className="flex items-center z-50 gap-4">
      <li>
        <Input startContent={<SearchIcon />} placeholder="Finn produkter" />
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
        <CartIcon />
      </li>
    </ul>
  );
};
