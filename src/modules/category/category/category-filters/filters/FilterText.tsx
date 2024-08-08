import React from "react";

import { Radio, RadioGroup } from "@nextui-org/react";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { FilterStringTypeInput, ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterText: React.FC<Props> = ({ data }) => {
  const { setQueryFilter, getQueryFilter, removeQueryFilter } =
    useCategoryFilters();
  if (!data) return null;

  const onFilterChange = (value: string) => {
    if (value) {
      setQueryFilter(data.attribute_code, JSON.stringify({ match: value }));
    } else {
      removeQueryFilter(data.attribute_code);
    }
  };

  const filter = getQueryFilter<FilterStringTypeInput>(data.attribute_code);
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
