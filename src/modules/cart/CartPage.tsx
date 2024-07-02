"use client";

import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CartPrice } from "@/modules/cart/cart-price/CartPrice";
import { CartItem } from "@/modules/cart/CartItem";
import { CartMethodLinks } from "@/modules/cart/CartMethodLinks";

export const CartPage: React.FC = () => {
  const { data } = useCartQuery();

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
          <div className="bg-white flex flex-col gap-6 rounded-2xl p-4 lg:p-8">
            <CartMethodLinks />
            <div className="border-t border-t-cold-grey-dark border-opacity-80" />
            {data?.items?.map((item, idx) => (
              <CartItem key={idx} item={item} />
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-6">
            <CartPrice prices={data?.prices} />
          </div>
        </div>
      </div>
      <Debugger data={data} />
    </ContainerLayout>
  );
};
