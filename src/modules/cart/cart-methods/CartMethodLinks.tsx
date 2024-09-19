"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { useRouter, useSearchParams } from "next/navigation";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { setDeliveryType } from "@/modules/cart/cart-methods/actions";
import { CartMethodLink } from "@/modules/cart/cart-methods/CartMethodLink";
import { BaseCartFragment, BaseStoreFragment } from "@/types";
import { DELIVERY_TYPE_MAP } from "@/utils/helpers";

interface Props {
  selectedStore?: BaseStoreFragment | null;
  cart?: BaseCartFragment | null;
}

export const CartMethodLinks: React.FC<Props> = ({ selectedStore, cart }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const activeMethod = searchParams.get("method") ?? "online";
  const [_cookies, setCookie] = useCookies();
  const router = useRouter();

  const setPreferredMethod = async (method: "online" | "collect") => {
    if (!cart?.id) {
      return;
    }
    setIsLoading(true);

    await setDeliveryType({
      cartId: cart?.id,
      type: DELIVERY_TYPE_MAP[method],
    })
      .then(() => {
        router.push(`/cart?method=${method}`);
        setCookie("preferredMethod", method, {
          path: "/",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {isLoading ? <PageTopLoader /> : null}
      <CartMethodLink
        icon={<LocalShippingIcon width={24} height={24} />}
        setPreferredMethod={() => setPreferredMethod("online")}
        label="Hjemlevering"
        description="Til fortauskant eller utleveringssted"
        isActive={activeMethod === "online"}
      />
      <CartMethodLink
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
