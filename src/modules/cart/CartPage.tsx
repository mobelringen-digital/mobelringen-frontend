import React from "react";

import Link from "next/link";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { getSelectedStore } from "@/components/store-selector/actions";
import { PageTitle } from "@/components/typography/PageTitle";
import { CartMethodLinks } from "@/modules/cart/cart-methods/CartMethodLinks";
import { CartPrice } from "@/modules/cart/cart-price/CartPrice";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";
import { CartItems } from "@/modules/cart/CartItems";
import { CartWarnings } from "@/modules/cart/CartWarnings";
import { BaseCartFragment } from "@/types";

interface Props {
  data?: BaseCartFragment | null;
}

export async function CartPage({ data }: Props) {
  const selectedStore = await getSelectedStore();
  const isEmptyCart = !data || (data?.items && data.items.length === 0);

  return (
    <ContainerLayout>
      <CartBreadcrumbs />
      <PageTitle>Handlekurv</PageTitle>
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
                <CartMethodLinks selectedStore={selectedStore} />
                <CartWarnings cart={data} />
              </div>
              <div className="border-t border-t-cold-grey-dark border-opacity-80" />
              {data.items ? <CartItems data={data?.items} /> : null}
            </div>
          </div>
          <CartPrice cart={data} prices={data?.prices} />
        </div>
      )}

      <Debugger data={data} />
    </ContainerLayout>
  );
}
