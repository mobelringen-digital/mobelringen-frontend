"use client";

import React, { Key } from "react";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { debounce } from "lodash";

import { useRouter } from "next/navigation";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { LocationIcon } from "@/components/cms/block-store-element/LocationIcon";
import {
  BaseStoreFragment,
  CoordinatesInput,
  StoresListDocument,
  StoresListQuery,
} from "@/types";
import { stringToUrl } from "@/utils/helpers";
import { baseMagentoClient } from "@/utils/lib/graphql";

interface Props {
  stores?: Array<BaseStoreFragment | null> | null;
}

type StoreData = {
  key?: string | null;
  label?: string | null;
  description?: string | null;
};

export const StoresAutocomplete: React.FC<Props> = () => {
  const [isPending, startTransition] = React.useTransition();
  const [coordinates, setCoordinates] = React.useState<CoordinatesInput>();
  const [selectedKey, setSelectedKey] = React.useState<Key | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  console.log(coordinates);

  const list = useAsyncList<StoreData>({
    async load({ signal, filterText }) {
      const data = await baseMagentoClient(
        "GET",
        {},
        signal,
      ).request<StoresListQuery>(StoresListDocument, {
        searchInput: filterText,
        coordinates: coordinates,
        geolocation: !!coordinates,
      });

      return {
        items:
          data.getStores?.map((store) => ({
            key: store?.external_id,
            label: store?.name,
            description: store?.postcode,
          })) ?? [],
      };
    },
  });

  const handleSearchChange = debounce((value: string) => {
    list.setFilterText(value);
  }, 300);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const selectedStore = list.items?.find((item) => item.key === selectedKey);
    router.push(`/store/${selectedKey}/${stringToUrl(selectedStore?.label)}`);
    setIsLoading(false);
  };

  const handleLocationClick = () => {
    startTransition(() => {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position) => {
          setCoordinates({
            lat: String(position.coords.latitude),
            lng: String(position.coords.longitude),
          });
        });
      }
    });
  };

  if (!list.items) return null;

  return (
    <>
      {isPending || isLoading ? <PageTopLoader /> : null}
      <form className="flex gap-4" onSubmit={onSubmit} action="/finn-butikk">
        <Autocomplete
          name="searchInput"
          aria-label="Søk etter butikk"
          onInputChange={(e) => handleSearchChange(e)}
          onSelectionChange={(key) => setSelectedKey(key)}
          placeholder="Skriv postnummer eller sted"
          isLoading={list.isLoading}
          items={list.items}
          inputProps={{
            classNames: {
              input: "ml-1 text-base",
              inputWrapper: "h-[58px]",
            },
          }}
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <button
          onClick={handleLocationClick}
          className="bg-red p-4 rounded-xl w-[58px] flex-shrink-0 flex items-center justify-center"
          type="button"
          disabled={list.isLoading}
        >
          <LocationIcon />
        </button>
      </form>
    </>
  );
};
