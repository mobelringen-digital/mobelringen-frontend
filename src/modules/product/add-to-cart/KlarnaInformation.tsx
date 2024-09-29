import React from "react";

import Link from "next/link";

import { Clock } from "@/components/_ui/icons/figma/Clock";
import { Klarna } from "@/components/_ui/icons/figma/Klarna";
import { PriceTag } from "@/components/_ui/icons/figma/PriceTag";
import { Trailer } from "@/components/_ui/icons/figma/Trailer";

export const KlarnaInformation = () => {
  return (
    <>
      <div className="grid grid-cols-12 mt-2 text-xs lg:text-sm">
        <div className="col-span-4 flex flex-col items-center justify-center text-center gap-2">
          <Clock width={48} height={48} />
          <span>Finansiering</span>
        </div>
        <div className="col-span-4 flex flex-col items-center justify-center text-center gap-2">
          <Trailer width={48} height={48} />
          <span>Levering og montering</span>
        </div>
        <div className="col-span-4 flex flex-col items-center justify-center text-center gap-2">
          <PriceTag width={48} height={48} />
          <div className="flex flex-col text-center justify-center items-center">
            Vi matcher prisen
            <Link className="underline" href="/prismatch">
              Les mer
            </Link>
          </div>
        </div>
      </div>
      {
  /*      <div className="flex text-xs lg:text-sm mt-2 justify-between bg-sand rounded-2xl px-4 py-3">
        <div className="flex items-center gap-1">
          <span>Betal xxxx kr/mnd i 6 måneder med</span>
          <Klarna />
        </div>
        <Link className="underline" href="#">
          Les mer
        </Link>
      </div>
      */
}
    </>
  );
};
