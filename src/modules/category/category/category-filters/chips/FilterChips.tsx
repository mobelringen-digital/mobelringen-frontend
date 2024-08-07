import React from "react";

import { FilterChip } from "@/modules/category/category/category-filters/chips/FilterChip";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import {
  isBooleanFilter,
  isRangeFilter,
  isSelectFilter,
  isTextFilter,
} from "@/modules/category/factories";
import { ProductAggregationsFragment } from "@/types";

interface Props {
  filters?: Array<ProductAggregationsFragment | null> | null;
}

export const FilterChips: React.FC<Props> = ({ filters }) => {
  const { filtersFormValues, removeQueryFilter, resetQueryFilters } =
    useCategoryFilters();

  const getFilter = React.useCallback(
    (key: string) => {
      return filters?.find((f) => f?.attribute_code === key);
    },
    [filters],
  );

  const mappedFilterValuesForChip = React.useMemo(() => {
    if (!filtersFormValues) return;

    return Object.entries(filtersFormValues).map(([key, value]) => {
      const filter = getFilter(key);

      if (!filter || !filter.frontend_input) return;

      if (isRangeFilter(filter.frontend_input) && Array.isArray(value)) {
        return {
          key: `${key}|${filter.frontend_input}`,
          label: filter.label,
          value: `${value[0]} - ${value[1]}`,
          type: filter.frontend_input,
        };
      }

      if (isTextFilter(filter.frontend_input) && value) {
        return {
          key: `${key}|${filter.frontend_input}`,
          label: filter.label,
          value: value as string,
          type: filter.frontend_input,
        };
      }

      if (isBooleanFilter(filter.frontend_input) && value) {
        return {
          key: `${key}|${filter.frontend_input}`,
          label: filter.label,
          value: value ? "Ja" : "Nej",
          type: filter.frontend_input,
        };
      }

      if (isSelectFilter(filter.frontend_input) && Array.isArray(value)) {
        return {
          key: `${key}|${filter.frontend_input}`,
          label: filter.label,
          value: value.join(", "),
          type: filter.frontend_input,
        };
      }
    });
  }, [filtersFormValues, getFilter]);

  return (
    <>
      {mappedFilterValuesForChip && mappedFilterValuesForChip.length > 0 ? (
        <div className="flex flex-wrap items-center gap-4 my-4">
          {mappedFilterValuesForChip?.map((f, idx) => {
            if (!f?.key) return null;

            return (
              <FilterChip
                key={idx}
                label={f.label as string}
                value={f.value as string}
                onRemove={() => removeQueryFilter(f.key as string)}
              />
            );
          })}
          <button className="underline text-sm" onClick={resetQueryFilters}>
            Fjern filtre
          </button>
        </div>
      ) : null}
    </>
  );
};
