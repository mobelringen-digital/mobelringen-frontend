"use client";

import React from "react";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isOpen = searchParams.get("store") === "select";

  const onClose = () => {
    const query = new URLSearchParams(searchParams.toString());
    query.delete("store");

    router.push(`${pathname}?${query}`);
  };

  return (
    <React.Fragment>
      <StoreSelectModal
        stores={stores}
        isOpen={isOpen}
        selectedStore={selectedStore}
        isAuthorized={isAuthorized}
        onClose={onClose}
      />

      {/*Desktop menu*/}
      <div className="gap-4 text-xs hidden lg:flex">
        <button
          aria-labelledby={selectedStore?.name ?? "Velg butikk"}
          onClick={() => router.push(`${pathname}?store=select`)}
          className="flex gap-1 items-center"
        >
          <Location /> {selectedStore?.name ?? "Velg butikk"}
        </button>
        <Link
          aria-label="Butikkoversikt"
          href="/finn-butikk"
          className="flex gap-1 items-center"
        >
          <Storefront /> Butikkoversikt
        </Link>
      </div>

      {/*Render mobile menu*/}
      <ul className="flex-col gap-5 py-8 border-t border-t-cold-grey-dark flex lg:hidden">
        <li className="flex justify-between items-center">
          <button
            aria-labelledby={selectedStore?.name ?? "Velg butikk"}
            className="flex gap-1 items-center"
            onClick={() => router.push(`${pathname}?store=select`)}
          >
            <Location width={26} height={26} />{" "}
            {selectedStore?.name ?? "Velg butikk"}
          </button>
          <ChevronRight />
        </li>
        <li className="flex justify-between items-center">
          <Link
            aria-label="Butikkoversikt"
            href="/finn-butikk"
            className="flex gap-2 items-center"
          >
            <Storefront width={20} height={20} /> Butikkoversikt
          </Link>
          <ChevronRight />
        </li>
      </ul>
    </React.Fragment>
  );
};
