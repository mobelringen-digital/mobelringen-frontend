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
        <Button onClick={() => setIsOpen((prev) => !prev)} color="secondary">
          Detaljer
        </Button>
      ) : (
        <div className="flex gap-4 flex-col">
          {data?.items.map((item) => {
            return (
              <div
                className="flex flex-col gap-2 border-b pb-4 border-dark-grey border-opacity-30"
                key={item?.sku}
              >
                <div className="flex gap-4 lg:gap-6">
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
                  <div className="flex flex-col justify-between items-end">
                    <span className="font-semibold text-sm lg:text-base">
                      <FormatNumber
                        value={item?.price}
                        format="currency"
                        suffix=" kr"
                      />
                    </span>
                    {item?.delivery_date ? (
                      <span className="text-sm hidden lg:flex">
                        Forventet leveringsdato: {item.delivery_date}
                      </span>
                    ) : null}
                  </div>
                </div>
                {item?.delivery_date ? (
                  <span className="text-sm flex lg:hidden">
                    Forventet leveringsdato: {item.delivery_date}
                  </span>
                ) : null}
              </div>
            );
          })}
          <OrderItemTotal data={data} />
          <div className="block mt-4 border-t border-dark-grey border-opacity-30 pt-4">
            <Button
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
