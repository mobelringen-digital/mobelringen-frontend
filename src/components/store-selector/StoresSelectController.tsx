"use client";

import React from "react";

import Link from "next/link";

import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { Location } from "@/components/_ui/icons/figma/Location";
import { Storefront } from "@/components/_ui/icons/figma/Storefront";
import { StoreSelectModal } from "@/components/store-selector/StoreSelectModal";
import { BaseStoreFragment } from "@/types";

interface Props {
  stores: Array<BaseStoreFragment | null>;
  isAuthorized: boolean;
  selectedStore?: BaseStoreFragment | null;
}

export const StoresSelectController: React.FC<Props> = ({
  stores,
  isAuthorized,
  selectedStore,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StoreSelectModal
        stores={stores}
        isOpen={isOpen}
        selectedStore={selectedStore}
        isAuthorized={isAuthorized}
        onClose={() => setIsOpen(false)}
      />

      {/*Desktop menu*/}
      <div className="gap-4 text-xs hidden lg:flex">
        <button
          onClick={() => setIsOpen(true)}
          className="flex gap-1 items-center"
        >
          <Location /> {selectedStore?.name ?? "Velg butikk"}
        </button>
        <Link href="/finn-butikk" className="flex gap-1 items-center">
          <Storefront /> Butikkoversikt
        </Link>
      </div>

      {/*Render mobile menu*/}
      <ul className="flex-col gap-5 py-8 border-t border-t-cold-grey-dark flex lg:hidden">
        <li className="flex justify-between items-center">
          <button
            className="flex gap-1 items-center"
            onClick={() => setIsOpen(true)}
          >
            <Location width={26} height={26} />{" "}
            {selectedStore?.name ?? "Velg butikk"}
          </button>
          <ChevronRight />
        </li>
        <li className="flex justify-between items-center">
          <Link href="/finn-butikk" className="flex gap-2 items-center">
            <Storefront width={20} height={20} /> Butikkoversikt
          </Link>
          <ChevronRight />
        </li>
      </ul>
    </React.Fragment>
  );
};
