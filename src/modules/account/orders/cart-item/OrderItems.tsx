"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { OrderItemTotal } from "@/modules/account/orders/cart-item/OrderItemTotal";
import { CustomerOrderFragment } from "@/types";

interface Props {
  data?: CustomerOrderFragment | null;
}

export const OrderItems: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="block">
      {!isOpen ? (
        <Button
          aria-label="Detaljer"
          onClick={() => setIsOpen((prev) => !prev)}
          color="secondary"
        >
          Detaljer
        </Button>
      ) : (
        <div className="flex gap-4 flex-col">
          {data?.items.map((item) => {
            return (
              <div
                className="flex gap-4 lg:gap-6 border-b pb-4 border-dark-grey border-opacity-30"
                key={item?.sku}
              >
                <Link
                  href={item?.link ?? ""}
                  className="relative p-4 w-[80px] h-[80px] bg-warm-grey rounded-xl lg:rounded-3xl !flex justify-center items-center"
                >
                  {item?.image && (
                    <Image
                      className="object-contain h-[64px]"
                      width={64}
                      height={64}
                      src={item?.image}
                      alt={item?.name ?? ""}
                    />
                  )}
                </Link>
                <div className="flex flex-col grow gap-2 justify-center">
                  <span className="font-semibold">{item?.name}</span>
                  <span className="text-dark-grey text-sm">
                    Antall: {item?.quantity}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-semibold">
                    <FormatNumber
                      value={item?.price}
                      format="currency"
                      suffix=" kr"
                    />
                  </span>
                </div>
              </div>
            );
          })}
          <OrderItemTotal data={data} />
          <div className="block mt-4 border-t border-dark-grey border-opacity-30 pt-4">
            <Button
              aria-label="Lukk"
              onClick={() => setIsOpen((prev) => !prev)}
              color="secondary"
            >
              Lukk
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
