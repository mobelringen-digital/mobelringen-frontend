import React from "react";

import Link from "next/link";

import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { BaseStoreFragment } from "@/types";
import { stringToUrl } from "@/utils/helpers";

interface Props {
  store: BaseStoreFragment;
}

const StoreInfo: React.FC<Props> = ({ store }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-normal">{store?.name}</span>
      <span className="text-sm font-light text-dark-grey">
        {[store?.street, store?.postcode, store?.city].join(", ")}
      </span>
    </div>
  );
};

export const Store: React.FC<Props> = ({ store }) => {
  return (
    <>
      <div className="flex w-full lg:hidden">
        <Link
          className="px-4 flex w-full"
          href={`/store/${store.external_id}/${stringToUrl(store.name)}`}
        >
          <div className="w-full justify-between items-center flex">
            <StoreInfo store={store} />
            <ChevronRight />
          </div>
        </Link>
      </div>
      <div className="justify-between items-center hidden lg:flex">
        <StoreInfo store={store} />
        <Link
          className="p-4"
          href={`/store/${store.external_id}/${stringToUrl(store.name)}`}
        >
          <ChevronRight />
        </Link>
      </div>
    </>
  );
};
