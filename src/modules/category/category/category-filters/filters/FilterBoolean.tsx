import React from "react";

import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import qs from "qs";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { FilterStringTypeInput, ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterBoolean: React.FC<Props> = ({ data }) => {
  const { setQueryFilter, getQueryFilter, removeQueryFilter } =
    useCategoryFilters();

  if (!data) return null;

  const onFilterChange = (value: string[]) => {
    if (value.length > 0) {
      setQueryFilter(
        data.attribute_code,
        qs.stringify({ in: value }, { encode: false }),
      );
    } else {
      removeQueryFilter(data.attribute_code);
    }
  };

  const filter = getQueryFilter<FilterStringTypeInput>(data.attribute_code);
  const value = (filter?.in as string[]) ?? [];

  return (
    <FilterWrapper title={data.label}>
      <CheckboxGroup
        value={value}
        aria-label={String(data.label)}
        onValueChange={onFilterChange}
      >
        {data.options?.map((option, idx) => (
          <Checkbox key={idx} value={option?.value as string}>
            {option?.label} ({option?.count})
          </Checkbox>
        ))}
      </CheckboxGroup>
    </FilterWrapper>
  );
};
