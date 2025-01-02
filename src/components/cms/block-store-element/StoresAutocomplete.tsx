"use client";

import React from "react";

import {
  Autocomplete,
  AutocompleteItem,
  MenuTriggerAction,
} from "@nextui-org/react";
import { useFilter } from "@react-aria/i18n";

import { LocationIcon } from "@/components/cms/block-store-element/LocationIcon";
import { BaseStoreFragment } from "@/types";

interface Props {
  stores?: Array<BaseStoreFragment | null> | null;
}

export type FieldState = {
  selectedKey: React.Key | null;
  inputValue: string;
  items?: Array<BaseStoreFragment | null> | null;
};

export const StoresAutocomplete: React.FC<Props> = ({ stores }) => {
  const [fieldState, setFieldState] = React.useState<FieldState>({
    selectedKey: "",
    inputValue: "",
    items: stores,
  });
  const { startsWith } = useFilter({ sensitivity: "base" });

  if (!stores) return null;

  console.log(fieldState);

  const onSelectionChange = (key: React.Key | null) => {
    setFieldState((prevState) => {
      const selectedItem = prevState.items?.find(
        (option) => option?.external_id === key,
      );

      return {
        inputValue: selectedItem?.name || "",
        selectedKey: key,
        items: stores.filter((item) =>
          startsWith(item?.postcode || "", selectedItem?.name || ""),
        ),
      };
    });
  };

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: stores.filter((item) => startsWith(item?.postcode || "", value)),
    }));
  };

  const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
    if (menuTrigger === "manual" && isOpen) {
      setFieldState((prevState) => ({
        inputValue: prevState.inputValue,
        selectedKey: prevState.selectedKey,
        items: stores,
      }));
    }
  };

  const storesData = stores?.map((store) => ({
    key: store?.external_id,
    label: store?.name,
    description: store?.postcode,
  }));

  return (
    <form className="flex gap-4" action="/finn-butikk">
      <Autocomplete
        name="searchInput"
        defaultItems={storesData}
        placeholder="Skriv postnummer eller sted"
        onInputChange={onInputChange}
        onOpenChange={onOpenChange}
        onSelectionChange={onSelectionChange}
        inputProps={{
          classNames: {
            input: "ml-1",
            inputWrapper: "h-[58px]",
          },
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <button className="bg-red p-4 rounded-xl w-[58px] flex-shrink-0 flex items-center justify-center" type="submit">
        <LocationIcon />
      </button>
    </form>
  );
};
