import React from "react";

import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterSelect: React.FC<Props> = ({ data }) => {
  const { setQueryFilter, getQueryFilter } = useCategoryFilters();
  if (!data) return null;

  const onFilterChange = (value: string[]) => {
    setQueryFilter(data.attribute_code, value, data.frontend_input);
  };

  const value = getQueryFilter<string[]>(
    `${data.attribute_code}|${data.frontend_input}`,
  );

  return (
    <FilterWrapper title={data.label}>
      <CheckboxGroup
        aria-label={String(data.label)}
        onValueChange={onFilterChange}
        value={value}
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
