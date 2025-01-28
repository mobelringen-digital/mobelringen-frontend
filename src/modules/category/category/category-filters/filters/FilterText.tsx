import React from "react";

import { Radio, RadioGroup } from "@nextui-org/react";

import { ExpandFilters } from "@/modules/category/category/category-filters/ExpandFilters";
import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { FilterStringTypeInput, ProductAggregationsFragment } from "@/types";
import { FILTERS_INITIAL_COUNT } from "@/utils/helpers";
import { useQueryParams } from "@/utils/hooks/useQueryParams";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterText: React.FC<Props> = ({ data }) => {
  const [showAll, setShowAll] = React.useState(false);
  const { setFilter, getFilter, removeFilter } = useQueryParams();
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

  const handleLoad = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAll((prev) => !prev);
  };

  return (
    <FilterWrapper title={data.label}>
      <RadioGroup
        aria-label={String(data.label)}
        onValueChange={onFilterChange}
        value={value}
      >
        {data.options
          ?.slice(0, showAll ? data.options?.length : FILTERS_INITIAL_COUNT)
          .map((option, idx) => (
            <Radio key={idx} value={option?.value as string}>
              {option?.label} ({option?.count})
            </Radio>
          ))}
      </RadioGroup>
      <ExpandFilters onClick={handleLoad} data={data} showAll={showAll} />
    </FilterWrapper>
  );
};
