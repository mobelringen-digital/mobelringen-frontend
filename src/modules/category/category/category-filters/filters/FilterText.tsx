import React from "react";

import { Radio, RadioGroup } from "@nextui-org/react";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useFiltersQuery } from "@/modules/category/category/category-filters/useFiltersQuery";
import { FilterStringTypeInput, ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

const SHOW_FIRST_FILTERS = 3;

export const FilterText: React.FC<Props> = ({ data }) => {
  const [showAll, setShowAll] = React.useState(false);
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
          ?.slice(0, showAll ? data.options?.length : SHOW_FIRST_FILTERS)
          .map((option, idx) => (
            <Radio key={idx} value={option?.value as string}>
              {option?.label} ({option?.count})
            </Radio>
          ))}
      </RadioGroup>
      {data.options && data.options?.length > SHOW_FIRST_FILTERS ? (
        <div className="flex w-full justify-center mt-2">
          <button
            type="button"
            className="text-sm mt-2 text-gray-500 underline"
            onClick={handleLoad}
          >
            {showAll ? (
              <>Vis færre</>
            ) : (
              <>Vis flere ({data.options?.length - SHOW_FIRST_FILTERS})</>
            )}
          </button>
        </div>
      ) : null}
    </FilterWrapper>
  );
};
