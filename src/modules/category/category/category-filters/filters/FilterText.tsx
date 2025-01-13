import React from "react";

import { Radio, RadioGroup } from "@nextui-org/react";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useFiltersQuery } from "@/modules/category/category/category-filters/useFiltersQuery";
import { FilterStringTypeInput, ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

const MAX_PER_PAGE = 8;

export const FilterText: React.FC<Props> = ({ data }) => {
  const [loadedFilters, setLoadedFilters] = React.useState(MAX_PER_PAGE);
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

  const loadMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadedFilters((prev) => prev + MAX_PER_PAGE);
  };

  return (
    <FilterWrapper title={data.label}>
      <RadioGroup
        aria-label={String(data.label)}
        onValueChange={onFilterChange}
        value={value}
      >
        {data.options?.slice(0, loadedFilters).map((option, idx) => (
          <Radio key={idx} value={option?.value as string}>
            {option?.label} ({option?.count})
          </Radio>
        ))}
      </RadioGroup>
      {data.options && data.options?.length > loadedFilters ? (
        <button
          type="button"
          className="text-sm mt-2 text-gray-500 underline"
          onClick={loadMore}
        >
          Vis flere
        </button>
      ) : null}
    </FilterWrapper>
  );
};
