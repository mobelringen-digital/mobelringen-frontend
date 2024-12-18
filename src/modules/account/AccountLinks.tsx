"use client";

import React from "react";

import cx from "classnames";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Account } from "@/modules/account/components/icons/Account";
import { Active } from "@/modules/account/components/icons/Active";
import { CustomerService } from "@/modules/account/components/icons/CustomerService";
import { Orders } from "@/modules/account/components/icons/Orders";
import { Preferences } from "@/modules/account/components/icons/Preferences";
import { Settings } from "@/modules/account/components/icons/Settings";
import {Wishlist} from "@/modules/account/components/icons/Wishlist";
import { LogoutButton } from "@/modules/account/LogoutButton";

const ACCOUNT_LINKS = [
  {
    label: "Forside",
    url: "/account",
    icon: <Account />,
  },
  {
    label: "Mine bestillinger",
    url: "/account/orders",
    icon: <Orders />,
  },
  {
    label: "Ønskelister",
    url: "/account/wishlist",
    icon: <Wishlist />,
  },
  // {
  //   label: "Rabattkuponger",
  //   url: "/account/coupons",
  //   icon: <Coupons />,
  // },
  {
    label: "Kundeservice",
    url: "/account/customer-service",
    icon: <CustomerService />,
  },
  {
    label: "Samtykker og preferanser",
    url: "/account/preferences",
    icon: <Preferences />,
  },
  {
    label: "Profilinstillinger",
    url: "/account/settings",
    icon: <Settings />,
  },
];

export const AccountLinks = () => {
  const pathname = usePathname();

  return (
    <div className="lg:sticky top-[150px] bg-white rounded-2xl p-6 flex flex-col">
      <span className="text-base mb-4 font-semibold">Min profil</span>
      {ACCOUNT_LINKS.map((item, idx) => (
        <Link
          key={idx}
          href={item.url}
          className={cx("p-4 rounded-2xl hover:bg-warm-grey group", {
            "bg-warm-grey": pathname === item.url,
          })}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <Active
              className={cx("group-hover:block", {
                block: pathname === item.url,
                hidden: pathname !== item.url,
              })}
            />
          </div>
        </Link>
      ))}
      <LogoutButton />
    </div>
  );
};
