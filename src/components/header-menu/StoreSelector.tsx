import React from "react";

import Link from "next/link";

import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { Location } from "@/components/_ui/icons/figma/Location";
import { Storefront } from "@/components/_ui/icons/figma/Storefront";

export const StoreSelector: React.FC = () => {
  return (
    <React.Fragment>
      {/*Desktop menu*/}
      <div className="gap-4 text-xs hidden lg:flex">
        <button className="flex gap-1 items-center">
          <Location /> Møbelringen Lørenskog
        </button>
        <Link href="#" className="flex gap-1 items-center">
          <Storefront /> Butikkoversikt
        </Link>
      </div>

      {/*Render mobile menu*/}
      <ul className="flex-col gap-5 py-8 border-t border-t-cold-grey-dark flex lg:hidden">
        <li className="flex justify-between items-center">
          <button className="flex gap-1 items-center">
            <Location width={26} height={26} /> Møbelringen Lørenskog
          </button>
          <ChevronRight />
        </li>
        <li className="flex justify-between items-center">
          <Link href="#" className="flex gap-2 items-center">
            <Storefront width={20} height={20} /> Butikkoversikt
          </Link>
          <ChevronRight />
        </li>
      </ul>
    </React.Fragment>
  );
};
