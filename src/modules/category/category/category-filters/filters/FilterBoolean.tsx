import React from "react";

import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useFiltersQuery } from "@/modules/category/category/category-filters/useFiltersQuery";
import { FilterStringTypeInput, ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterBoolean: React.FC<Props> = ({ data }) => {
  const { setFilter, getFilter, removeFilter } = useFiltersQuery();

  if (!data) return null;

  const onFilterChange = (value: string[]) => {
    if (value.length > 0) {
      setFilter(data.attribute_code, { in: value });
    } else {
      removeFilter(data.attribute_code);
    }
  };

  const filter = getFilter<FilterStringTypeInput>(data.attribute_code);
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
