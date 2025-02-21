"use client";

import React, { Key } from "react";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { debounce } from "lodash";

import { useRouter } from "next/navigation";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { LocationIcon } from "@/components/cms/block-store-element/LocationIcon";
import { useStoresList } from "@/components/cms/block-stores-map/useStoresList";
import { BaseStoreFragment, CoordinatesInput } from "@/types";
import { stringToUrl } from "@/utils/helpers";

interface Props {
  stores?: Array<BaseStoreFragment | null> | null;
}

export const StoresAutocomplete: React.FC<Props> = () => {
  const [isPending, startTransition] = React.useTransition();
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [coordinates, setCoordinates] = React.useState<CoordinatesInput>();
  const [locateByIp, setLocateByIp] = React.useState<boolean>(false);
  const [selectedStoreId, setSelectedStoreId] = React.useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { data: stores, isLoading: isFetchingStores } = useStoresList({
    searchInput,
    coordinates,
    ipLocate: locateByIp,
  });

  const handleSearchChange = debounce((value: string) => {
    setCoordinates(undefined);
    setLocateByIp(false);
    setSearchInput(value);
  }, 300);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const selectedStore = stores?.find((item) => item?.id === selectedStoreId);
    router.push(
      `/store/${selectedStoreId}/${stringToUrl(selectedStore?.name)}`,
    );
    setIsLoading(false);
  };

  const handleSelectionChange = (key: Key | null) => {
    setSelectedStoreId(key as string);
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
      } else {
        return setLocateByIp(true);
      }
    });
  };

  return (
    <>
      {isPending || isLoading || isFetchingStores ? <PageTopLoader /> : null}
      <form className="flex gap-4" onSubmit={onSubmit} action="/finn-butikk">
        <Autocomplete
          name="searchInput"
          aria-label="Søk etter butikk"
          isLoading={isLoading}
          onInputChange={(e) => handleSearchChange(e)}
          onSelectionChange={(key) => handleSelectionChange(key)}
          placeholder="Skriv postnummer eller sted"
          items={(stores ?? [])?.map((store) => ({
            key: store?.id,
            label: store?.name,
          }))}
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
        >
          <LocationIcon />
        </button>
      </form>
    </>
  );
};
