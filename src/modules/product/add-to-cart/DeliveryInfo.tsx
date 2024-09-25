import React from "react";

import { LocalShippingIcon } from "@/components/_ui/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/_ui/icons/StorefrontIcon";
import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const DeliveryInfo: React.FC<Props> = ({ product }) => {
  const storesWithStock = product.stores?.filter(
    (store) => store?.qty && store.qty > 0,
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="font-semibold flex items-center gap-2 text-sm lg:text-base">
          <LocalShippingIcon width={24} height={24} />
          Nettbutikk
        </span>

        <div className="flex gap-2 mt-2">
          <StatusCircle
            variant={!!product.delivery_promise ? "green" : "red"}
            className="mt-1 ml-1"
          />
          <div className="flex flex-col">
            <span className="text-sm lg:text-base">Tilgjengelig på nett</span>
            {product.delivery_promise ? (
              <span className="text-xs lg:text-sm text-dark-grey">
                {product.delivery_promise}
              </span>
            ) : null}
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
              Tilgjengelig i {storesWithStock?.length ?? 0} butikker
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
