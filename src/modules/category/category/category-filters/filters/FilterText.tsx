import React from "react";

import { Radio, RadioGroup } from "@nextui-org/react";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useFiltersQuery } from "@/modules/category/category/category-filters/useFiltersQuery";
import { FilterStringTypeInput, ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterText: React.FC<Props> = ({ data }) => {
  const { setFilter, getFilter, removeFilter } = useFiltersQuery();
  if (!data) return null;

  const onFilterChange = (value: string) => {
    if (value) {
      setFilter(data.attribute_code, { match: value });
    } else {
      removeFilter(data.attribute_code);
    }
  };

  const filter = getFilter<FilterStringTypeInput>(data.attribute_code);
  const value = (filter?.match as string) ?? "";

  return (
    <FilterWrapper title={data.label}>
      <RadioGroup
        aria-label={String(data.label)}
        onValueChange={onFilterChange}
        value={value}
      >
        {data.options?.map((option, idx) => (
          <Radio key={idx} value={option?.value as string}>
            {option?.label} ({option?.count})
          </Radio>
        ))}
      </RadioGroup>
    </FilterWrapper>
  );
};
