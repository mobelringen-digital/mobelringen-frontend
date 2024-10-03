"use client";

import React from "react";

import { CirclePlusIcon } from "@/components/_ui/icons/CirclePlusIcon";
import { StoreInfoModal } from "@/modules/product/more-in-the-store/StoreInfoModal";

export const MoreInTheStore = () => {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <>
      <StoreInfoModal
        isOpen={isOpened}
        onClose={() => setIsOpened((prev) => !prev)}
      />
      <div className="bg-warm-grey p-4 lg:p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg lg:text-xl font-semibold">
            Flere valgmuligheter i butikk
          </h4>
          <button onClick={() => setIsOpened((prev) => !prev)}>
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
