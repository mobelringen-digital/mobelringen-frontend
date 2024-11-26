import React from "react";

import Link from "next/link";

import { FavoriteIcon } from "@/components/_ui/icons/FavoriteIcon";
import { PersonIcon } from "@/components/_ui/icons/PersonIcon";
import { ShoppingBagIcon } from "@/components/_ui/icons/ShoppingBagIcon";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { getToken } from "@/modules/auth/actions";

const LINKS = [
  {
    icon: <PersonIcon />,
    label: "Min profil",
    url: "/account",
  },
  {
    icon: <FavoriteIcon />,
    label: "Favoritter",
    url: "/account/favorite",
  },
  {
    icon: <ShoppingBagIcon />,
    label: "Handlekurv",
    url: "/cart",
  },
];

export async function MobileMenuBottomLinks() {
  const token = await getToken();

  if (!token) {
    return null;
  }

  return (
    <div className="fixed px-2 py-6 bottom-0 left-0 right-0">
      <ContainerLayout>
        <ul className="list-none flex justify-between items-center">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link aria-label={link.label} href={link.url} className="flex flex-col items-center">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </ContainerLayout>
    </div>
  );
}
