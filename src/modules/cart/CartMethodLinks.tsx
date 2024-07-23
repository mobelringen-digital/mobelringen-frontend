"use client";

import React from "react";

import cx from "classnames";
import { useCookies } from "react-cookie";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";

const CART_LINKS = [
  {
    icon: <LocalShippingIcon width={24} height={24} />,
    label: "Hjemlevering",
    method: "online",
    description: "Til fortauskant eller utleveringssted",
  },
  {
    icon: <StorefrontIcon width={24} height={24} />,
    label: "Klikk og hent",
    method: "collect",
    description: "Hentes hos: Lørenskog  Endre butikk",
  },
] as const;

export const CartMethodLinks = () => {
  const searchParams = useSearchParams();
  const activeMethod = searchParams.get("method") ?? "online";
  const [_cookies, setCookie] = useCookies();

  const setPreferredMethod = (method: "online" | "collect") => {
    setCookie("preferredMethod", method);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {CART_LINKS.map((link, idx) => (
        <Link
          key={idx}
          onClick={() => setPreferredMethod(link.method)}
          href={`/cart?method=${link.method}`}
          className={cx(
            "w-full px-4 py-1.5 lg:py-3 flex items-center gap-3 rounded-xl transition-all border hover:border-black",
            {
              "border-2 border-black shadow": activeMethod === link.method,
            },
            {
              "border-dark-grey border-opacity-50":
                activeMethod !== link.method,
            },
          )}
        >
          {link.icon}
          <div className="flex flex-col">
            <span className="font-semibold">{link.label}</span>
            <span className="text-xs lg:text-sm font-normal text-dark-grey">
              {link.description}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
