"use client";

import React from "react";

import Link from "next/link";

import { Card } from "@/components/_ui/icons/figma/Card";
import { PriceTag } from "@/components/_ui/icons/figma/PriceTag";
import { Truck } from "@/components/_ui/icons/figma/Truck";

interface Props {
  finalPrice: number;
}

const CustomKlarnaElement: React.FC<{ finalPrice: number }> = ({
  finalPrice,
}) => {
  return React.createElement("klarna-placement", {
    id: "klarna-placement",
    "data-key": "credit-promotion-auto-size",
    "data-locale": "no-NO",
    "data-purchase-amount": finalPrice * 100, // Klarna expects the amount in cents
  });
};

export const KlarnaInformation: React.FC<Props> = ({ finalPrice }) => {
  return (
    <>
      <div className="grid grid-cols-12 mt-2 text-xs lg:text-sm">
        <Link
          href="/kundeservice/betaling-og-finansiering"
          className="col-span-4 flex flex-col items-center justify-center text-center gap-2"
        >
          <Card />
          <span>Finansiering</span>
        </Link>
        <Link
          href="/kundeservice/levering-og-montering"
          className="col-span-4 flex flex-col items-center justify-center text-center gap-2"
        >
          <Truck />
          <span>Levering</span>
        </Link>
        <Link
          href="/prismatch"
          className="col-span-4 flex flex-col items-center justify-center text-center gap-2"
        >
          <PriceTag width={48} height={48} />
          <div className="flex flex-col text-center justify-center items-center">
            Prismatch
          </div>
        </Link>
      </div>
      <div className="flex mt-2 px-4 py-3">
        <CustomKlarnaElement finalPrice={finalPrice} />
      </div>
    </>
  );
};
