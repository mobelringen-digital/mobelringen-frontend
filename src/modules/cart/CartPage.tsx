import React from "react";

import Link from "next/link";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CartItem } from "@/modules/cart/cart-item/CartItem";
import { CartPrice } from "@/modules/cart/cart-price/CartPrice";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";
import { CartMethodLinks } from "@/modules/cart/CartMethodLinks";
import { CartTitle } from "@/modules/cart/CartTitle";
import { CartWarnings } from "@/modules/cart/CartWarnings";
import { BaseCartFragment } from "@/types";

interface Props {
  data?: BaseCartFragment | null;
}

export const CartPage: React.FC<Props> = ({ data }) => {
  const isEmptyCart = !data || (data?.items && data.items.length === 0);
  const isCheckoutEnabled = true;

  return (
    <ContainerLayout>
      <CartBreadcrumbs />
      <CartTitle />
      {isEmptyCart ? (
        <div className="flex flex-col text-center gap-2">
          <span>Du har ingen produkter i handlekurven.</span>
          <Link className="underline" href="/">
            Klikk her for å handle videre.
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-white flex flex-col gap-6 rounded-2xl p-4 lg:p-8">
              <div className="flex flex-col gap-4">
                <CartMethodLinks />
                <CartWarnings cart={data} />
              </div>
              <div className="border-t border-t-cold-grey-dark border-opacity-80" />
              {data?.items?.map((item, idx) => (
                <CartItem key={idx} item={item} />
              ))}
            </div>
          </div>
          <CartPrice
            checkoutDisabled={!isCheckoutEnabled}
            prices={data?.prices}
          />
        </div>
      )}

      <Debugger data={data} />
    </ContainerLayout>
  );
};
