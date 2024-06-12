import React from "react";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";
import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";

export const DeliveryInfo = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="font-semibold flex items-center gap-2 text-sm lg:text-base">
          <LocalShippingIcon width={24} height={24} />
          Nettbutikk
        </span>
        <div className="flex gap-2 mt-2">
          <StatusCircle variant="green" className="mt-1 ml-1" />
          <div className="flex flex-col">
            <span className="text-sm lg:text-base">Tilgjengelig på nett</span>
            <span className="text-xs lg:text-sm text-dark-grey">
              Estimert levering: 4-6 dager
            </span>
          </div>
        </div>
      </div>
      <div>
        <span className="font-semibold flex items-center gap-2 text-sm lg:text-base">
          <StorefrontIcon width={24} height={24} />
          Klikk og hent
        </span>
        <div className="flex gap-2 mt-2">
          <StatusCircle variant="green" className="mt-1 ml-1" />
          <div className="flex flex-col">
            <span className="text-sm lg:text-base">
              Tilgjengelig på Lørenskog
            </span>
            <span className="text-xs lg:text-sm text-dark-grey">
              Tilgjengelig i 13 butikker
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
