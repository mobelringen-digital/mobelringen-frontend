"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { useSearchParams } from "next/navigation";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";
import { CartMethodLink } from "@/modules/cart/cart-methods/CartMethodLink";
import { BaseStoreFragment } from "@/types";

interface Props {
  selectedStore?: BaseStoreFragment | null;
}

export const CartMethodLinks: React.FC<Props> = ({ selectedStore }) => {
  const searchParams = useSearchParams();
  const activeMethod = searchParams.get("method") ?? "online";
  const [_cookies, setCookie] = useCookies();

  const setPreferredMethod = (method: "online" | "collect") => {
    setCookie("preferredMethod", method);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CartMethodLink
        method="online"
        icon={<LocalShippingIcon width={24} height={24} />}
        setPreferredMethod={() => setPreferredMethod("online")}
        label="Hjemlevering"
        description="Til fortauskant eller utleveringssted"
        isActive={activeMethod === "online"}
      />
      <CartMethodLink
        method="collect"
        icon={<StorefrontIcon width={24} height={24} />}
        setPreferredMethod={() => setPreferredMethod("collect")}
        label="Klikk og hent"
        description={
          selectedStore ? `Hentes hos: ${selectedStore?.name}` : null
        }
        isActive={activeMethod === "collect"}
      />
    </div>
  );
};
