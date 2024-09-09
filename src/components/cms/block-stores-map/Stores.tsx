"use client";

import React from "react";

import cx from "classnames";

import dynamic from "next/dynamic";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { SearchInput } from "@/components/search/SearchInput";
import { PageTitle } from "@/components/typography/PageTitle";
import { BaseStoreFragment } from "@/types";

const Map = dynamic(() => import("./Map"), { ssr: false });

interface Props {
  stores?: Array<BaseStoreFragment | null> | null;
  title?: string;
}

const searchFields: Array<keyof BaseStoreFragment> = [
  "name",
  "postcode",
  "city",
];

export const Stores: React.FC<Props> = ({ stores, title }) => {
  const [storesList, setStoresList] = React.useState(stores);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [selectedStore, setSelectedStore] =
    React.useState<BaseStoreFragment | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    if (!searchValue) {
      setStoresList(stores);
      return;
    }

    const filteredStores = stores?.filter((str) =>
      searchFields.some((field) =>
        str?.[field]
          ?.toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      ),
    );

    setStoresList(filteredStores);
  }, [searchValue, stores]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ContainerLayout className="mb-16">
      {title ? <PageTitle>{title}</PageTitle> : null}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <div className="mb-8">
            <SearchInput
              onChange={onSearchChange}
              variant="bordered"
              placeholder="Skriv postnummer eller sted"
            />
          </div>

          <span className="text-xl py-2">Alle fylker</span>
          <div className="max-h-[600px] overflow-auto">
            <div className="flex flex-col">
              {storesList
                ?.filter((s) => s?.latitude && s?.longitude)
                .map((store, idx) => (
                  <button
                    onClick={() => setSelectedStore(store)}
                    className={cx(
                      "text-left py-4 border-b border-dark-grey border-opacity-30 hover:bg-warm-grey",
                      {
                        "bg-warm-grey":
                          selectedStore?.external_id === store?.external_id,
                      },
                    )}
                    key={idx}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-normal">{store?.name}</span>
                      <span className="text-sm font-light text-dark-grey">
                        {[store?.street, store?.postcode, store?.city].join(
                          ", ",
                        )}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Map selectedStore={selectedStore} stores={stores} />
        </div>
      </div>
    </ContainerLayout>
  );
};
