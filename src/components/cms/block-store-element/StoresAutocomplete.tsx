"use client";

import React from "react";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { debounce } from "lodash";

import { LocationIcon } from "@/components/cms/block-store-element/LocationIcon";
import {
  BaseStoreFragment,
  StoresListDocument,
  StoresListQuery,
} from "@/types";
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
  const list = useAsyncList<StoreData>({
    async load({ signal, filterText }) {
      const data = await baseMagentoClient(
        "GET",
        {},
        signal,
      ).request<StoresListQuery>(StoresListDocument, {
        searchInput: filterText,
      });

      return {
        items:
          data.getStores?.map((store) => ({
            key: store?.id,
            label: store?.name,
            description: store?.postcode,
          })) ?? [],
      };
    },
  });

  const handleSearchChange = debounce((value: string) => {
    list.setFilterText(value);
  }, 300);

  if (!list.items) return null;

  return (
    <form className="flex gap-4" action="/finn-butikk">
      <Autocomplete
        name="searchInput"
        aria-label="Søk etter butikk"
        onInputChange={(e) => handleSearchChange(e)}
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
        className="bg-red p-4 rounded-xl w-[58px] flex-shrink-0 flex items-center justify-center"
        type="submit"
        disabled={list.isLoading}
      >
        <LocationIcon />
      </button>
    </form>
  );
};
