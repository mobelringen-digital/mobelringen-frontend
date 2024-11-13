"use client";

import React from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import qs from "qs";

import { ArrowDown } from "@/components/_ui/icons/figma/ArrowDown";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";

const SORT_OPTIONS = [
  {
    label: "Pris Høy - Lav",
    key: "price-asc",
    param: "price",
    value: "DESC",
  },
  {
    label: "Pris Lav - Høy",
    key: "price-desc",
    param: "price",
    value: "ASC",
  },
  {
    label: "Nyeste",
    key: "position-desc",
    param: "position",
    value: "DESC",
  },
  {
    label: "Produktnavn",
    key: "name-asc",
    param: "name",
    value: "ASC",
  },
  {
    label: "Bestselger",
    key: "relevance-desc",
    param: "relevance",
    value: "DESC",
  },
  {
    label: "Høyeste rabatt (kr)",
    key: "discount-price-desc",
    param: "discount_price",
    value: "DESC",
  },
  {
    label: "Høyeste rabatt (%)",
    key: "discount-percentage-desc",
    param: "discount_percentage",
    value: "DESC",
  },
];

export const SortButton = () => {
  const { setQueryFilter, sortValues } = useCategoryFilters();

  const selectedValue = React.useMemo(() => {
    return SORT_OPTIONS.find((option) => {
      return (
        sortValues &&
        Object.keys(sortValues).includes(option.param) &&
        sortValues[option.param] === option.value
      );
    });
  }, [sortValues]);
  const selectedKey = new Set(selectedValue?.key);

  const onSortSelect = (keys: Selection) => {
    const key = Array.from(keys).join(", ").replaceAll("_", " ");
    const selectedOption = SORT_OPTIONS.find((o) => o.key === key);

    if (!selectedOption?.param || !selectedOption.value) {
      return;
    }

    setQueryFilter(
      "sort",
      qs.stringify({ [selectedOption?.param]: selectedOption?.value }),
    );
  };

  return (
    <div className="flex gap-4 item-center">
      <Dropdown>
        <DropdownTrigger>
          <Button
            type="button"
            className="flex items-center gap-2 bg-warm-grey text-dark-grey hover:bg-cold-grey-dark rounded-full py-6 px-6 lg:px-8 text-sm lg:text-base"
          >
            {selectedValue ? selectedValue.label : <>Sortering</>}
            <ArrowDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Sort options"
          selectionMode="single"
          selectedKeys={selectedKey}
          onSelectionChange={onSortSelect}
        >
          {SORT_OPTIONS.map((option) => {
            return <DropdownItem key={option.key}>{option.label}</DropdownItem>;
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
