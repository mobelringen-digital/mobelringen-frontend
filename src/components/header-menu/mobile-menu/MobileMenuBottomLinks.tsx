import React from "react";

import Link from "next/link";

import { FavoriteIcon } from "@/components/icons/FavoriteIcon";
import { PersonIcon } from "@/components/icons/PersonIcon";
import { ShoppingBagIcon } from "@/components/icons/ShoppingBagIcon";

const LINKS = [
  {
    icon: <PersonIcon />,
    label: "Min profil",
    url: "/min-profil",
  },
  {
    icon: <FavoriteIcon />,
    label: "Favoritter",
    url: "/min-profil",
  },
  {
    icon: <ShoppingBagIcon />,
    label: "Handlekurv",
    url: "/min-profil",
  },
];

export const MobileMenuBottomLinks = () => {
  return (
    <div className="fixed p-6 bottom-0 left-0 right-0">
      <ul className="list-none flex justify-between items-center">
        {LINKS.map((link) => (
          <li key={link.label}>
            <Link href={link.url} className="flex flex-col items-center">
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
