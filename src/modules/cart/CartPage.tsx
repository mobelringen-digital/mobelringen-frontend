"use client";

import React from "react";

import cx from "classnames";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CartPrice } from "@/modules/cart/cart-price/CartPrice";
import { CartItem } from "@/modules/cart/CartItem";

const CART_LINKS = [
  {
    label: "Hjemlevering",
    method: "online",
    description: "Til fortauskant eller utleveringssted",
  },
  {
    label: "Klikk og hent",
    method: "collect",
    description: "Hentes hos: Lørenskog  Endre butikk",
  },
] as const;

export const CartPage: React.FC = () => {
  const { data } = useCartQuery();
  const searchParams = useSearchParams();
  const activeMethod = searchParams.get("method") ?? "online";

  return (
    <ContainerLayout>
      <Breadcrumbs
        data={[
          {
            label: "Handlekurv",
            url: "/cart",
          },
        ]}
      />
      <div className="flex justify-center text-center">
        <h1 className="font-feature text-4xl lg:text-5xl font-normal mb-8 lg:mb-12">
          Handlekurv
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white flex flex-col gap-6 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {CART_LINKS.map((link, idx) => (
                <Link
                  key={idx}
                  href={`/cart?method=${link.method}`}
                  className={cx(
                    "w-full px-6 py-3 flex gap-2 rounded-xl transition-all border hover:border-black",
                    { "border-black shadow": activeMethod === link.method },
                    {
                      "border-dark-grey border-opacity-50":
                        activeMethod !== link.method,
                    },
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{link.label}</span>
                    <span className="text-xs lg:text-sm font-normal text-dark-grey">
                      {link.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t border-t-cold-grey-dark border-opacity-80" />
            {data?.items?.map((item, idx) => (
              <CartItem key={idx} item={item} />
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-white p-8 rounded-2xl flex flex-col gap-6">
            <CartPrice prices={data?.prices} />
          </div>
        </div>
      </div>
      <Debugger data={data} />
    </ContainerLayout>
  );
};
