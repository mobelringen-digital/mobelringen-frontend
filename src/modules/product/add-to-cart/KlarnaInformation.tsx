import React from "react";

import Link from "next/link";

import { Card } from "@/components/_ui/icons/figma/Card";
import { PriceTag } from "@/components/_ui/icons/figma/PriceTag";
import { Truck } from "@/components/_ui/icons/figma/Truck";

export const KlarnaInformation = () => {
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
      {/*<div className="flex text-xs lg:text-sm mt-2 justify-between bg-sand rounded-2xl px-4 py-3">*/}
      {/*  <div className="flex items-center gap-1">*/}
      {/*    <span>Betal xxxx kr/mnd i 6 måneder med</span>*/}
      {/*    <Klarna />*/}
      {/*  </div>*/}
      {/*  <Link className="underline" href="#">*/}
      {/*    Les mer*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </>
  );
};
