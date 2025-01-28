import React from "react";

import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { ExpandFilters } from "@/modules/category/category/category-filters/ExpandFilters";
import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { FilterStringTypeInput, ProductAggregationsFragment } from "@/types";
import { FILTERS_INITIAL_COUNT } from "@/utils/helpers";
import { useQueryParams } from "@/utils/hooks/useQueryParams";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterSelect: React.FC<Props> = ({ data }) => {
  const [showAll, setShowAll] = React.useState(false);
  const { setFilter, getFilter, removeFilter } = useQueryParams();

  if (!data) return null;

  const onFilterChange = (value: string[]) => {
    if (value.length > 0) {
      setFilter(data.attribute_code, { in: value });
    } else {
      removeFilter(data.attribute_code);
    }
  };

  const handleLoad = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAll((prev) => !prev);
  };

  const filter = getFilter<FilterStringTypeInput>(data.attribute_code);
  const value = (filter?.in as string[]) ?? [];

  return (
    <FilterWrapper title={data.label}>
      <CheckboxGroup
        aria-label={String(data.label)}
        onValueChange={onFilterChange}
        value={value}
      >
        {data.options
          ?.slice(0, showAll ? data.options?.length : FILTERS_INITIAL_COUNT)
          .map((option, idx) => (
            <Checkbox key={idx} value={option?.value as string}>
              {option?.label} ({option?.count})
            </Checkbox>
          ))}
      </CheckboxGroup>
      <ExpandFilters onClick={handleLoad} data={data} showAll={showAll} />
    </FilterWrapper>
  );
};
