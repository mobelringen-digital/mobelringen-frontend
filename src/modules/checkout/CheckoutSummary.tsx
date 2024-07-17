import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CartPricing } from "@/components/cart/CartPricing";
import { useCartQuery } from "@/components/cart/useCartQuery";

export const CheckoutSummary = () => {
  const { data: cart } = useCartQuery();

  return (
    <div className="bg-white flex flex-col gap-6 rounded-2xl p-4 lg:p-8">
      <div className="flex flex-col gap-6">
        <span className="text-xl text-black font-semibold">Ordreoversikt</span>
        <div className="flex gap-2 mb-4">
          {cart?.items?.map((item) => {
            return (
              <Link
                key={item?.id}
                href={item?.product.canonical_url ?? ""}
                className="relative p-2 w-[70px] h-[70px] bg-warm-grey rounded-xl lg:rounded-2xl !flex justify-center items-center"
              >
                {item?.product.image?.url && (
                  <Image
                    className="object-contain h-[50px]"
                    width={100}
                    height={100}
                    src={item?.product.image?.url}
                    alt={item?.product.image.label ?? ""}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <CartPricing />
      </div>
    </div>
  );
};
