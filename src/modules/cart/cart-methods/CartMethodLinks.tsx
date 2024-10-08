"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { useRouter, useSearchParams } from "next/navigation";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { setDeliveryType } from "@/modules/cart/cart-methods/actions";
import { CartMethodLink } from "@/modules/cart/cart-methods/CartMethodLink";
import { BaseCartFragment, BaseStoreFragment, DeliveryType } from "@/types";

interface Props {
  selectedStore?: BaseStoreFragment | null;
  cart?: BaseCartFragment | null;
}

export const CartMethodLinks: React.FC<Props> = ({ selectedStore, cart }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const [cookies, setCookie] = useCookies();
  const activeMethod = cookies.preferredMethod ?? searchParams.get("method");
  const router = useRouter();

  const setPreferredMethod = async (method: DeliveryType) => {
    if (!cart?.id) {
      return;
    }
    setIsLoading(true);

    await setDeliveryType({
      cartId: cart?.id,
      type: method,
    })
      .then(() => {
        setCookie("preferredMethod", method, {
          path: "/",
        });
        router.push(`/cart?method=${method}`);
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
        setPreferredMethod={() => setPreferredMethod(DeliveryType.Online)}
        label="Hjemlevering"
        description="Til fortauskant eller utleveringssted"
        isActive={activeMethod === DeliveryType.Online}
        disabled={isLoading}
      />
      <CartMethodLink
        icon={<StorefrontIcon width={24} height={24} />}
        setPreferredMethod={() => setPreferredMethod(DeliveryType.Cac)}
        label="Klikk og hent"
        description={
          selectedStore
            ? `Hentes hos: ${selectedStore?.name}`
            : "Ingen butikk er valgt"
        }
        isActive={activeMethod === DeliveryType.Cac}
        disabled={isLoading}
      />
    </div>
  );
};
