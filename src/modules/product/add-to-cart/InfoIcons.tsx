import React from "react";

import Link from "next/link";

import { Clock } from "@/components/_ui/icons/figma/Clock";
import { Klarna } from "@/components/_ui/icons/figma/Klarna";
import { PriceTag } from "@/components/_ui/icons/figma/PriceTag";
import { Trailer } from "@/components/_ui/icons/figma/Trailer";

export const InfoIcons = () => {
  return (
    <>
      <div className="flex justify-between mt-2 text-xs lg:text-sm">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <Clock width={48} height={48} />
          <span>Hent innen 48 timer etter bestilling</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <Trailer width={48} height={48} />
          <span>Lån tilhenger for hjemkjøring gratis</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <PriceTag width={48} height={48} />
          <span>Lån tilhenger for hjemkjøring gratis</span>
        </div>
      </div>
      <div className="flex text-xs lg:text-sm mt-2 justify-between bg-sand rounded-2xl px-4 py-2">
        <div className="flex items-center gap-1">
          <span>Betal xxxx kr/mnd i 6 måneder med</span>
          <Klarna />
        </div>
        <Link className="underline" href="#">
          Les mer
        </Link>
      </div>
    </>
  );
};
