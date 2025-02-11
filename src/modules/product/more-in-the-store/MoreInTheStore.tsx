"use client";

import React from "react";

import dynamic from "next/dynamic";

import { CirclePlusIcon } from "@/components/_ui/icons/CirclePlusIcon";
import { ModalType } from "@/types";

const CmsModal = dynamic(() => import("@/components/cms/modal/CmsModal"), {
  ssr: false,
});

export const MoreInTheStore = () => {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <>
      {isOpened ? (
        <CmsModal
          isOpen={isOpened}
          onClose={() => setIsOpened(false)}
          type={ModalType.MoreInTheStore}
        />
      ) : null}
      <div className="bg-warm-grey p-4 lg:p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg lg:text-xl font-semibold">
            Flere valgmuligheter i butikk
          </h4>
          <button
            aria-label="More in store"
            onClick={() => setIsOpened((prev) => !prev)}
          >
            <CirclePlusIcon />
          </button>
        </div>

        <p className="text-sm lg:text-base font-normal">
          Visste du at vi hjelper deg å skreddersy produkter i butikk? Les mer
          om hvordan vi kan hjelpe deg i din butikk.
        </p>
      </div>
    </>
  );
};
