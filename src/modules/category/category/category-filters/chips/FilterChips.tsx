import React from "react";

import { FilterChip } from "@/modules/category/category/category-filters/chips/FilterChip";
import { useFiltersQuery } from "@/modules/category/category/category-filters/useFiltersQuery";
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
  const { filterValues, removeFilter, resetQueryFilters } = useFiltersQuery();

  const getFilter = React.useCallback(
    (key: string) => {
      return filters?.find((f) => f?.attribute_code === key);
    },
    [filters],
  );

  const mappedFilterValuesForChip = React.useMemo(() => {
    if (!filterValues) return;

    return Object.entries(filterValues).map(([key, value]) => {
      const filter = getFilter(key);

      if (!filter || !filter.frontend_input) return;

      if (isRangeFilter(filter.frontend_input)) {
        return {
          key,
          label: filter.label,
          value: `${value.from} - ${value.to}`,
          type: filter.frontend_input,
        };
      }

      if (isTextFilter(filter.frontend_input)) {
        return {
          key,
          label: filter.label,
          value: value.match as string,
          type: filter.frontend_input,
        };
      }

      if (
        isBooleanFilter(filter.frontend_input) &&
        value.in &&
        Array.isArray(value.in)
      ) {
        return {
          key,
          label: filter.label,
          value: value.in ? "Ja" : "Nej",
          type: filter.frontend_input,
        };
      }

      if (
        isSelectFilter(filter.frontend_input) &&
        value.in &&
        Array.isArray(value.in)
      ) {
        return {
          key,
          label: filter.label,
          value: value.in.join(", "),
          type: filter.frontend_input,
        };
      }
    });
  }, [filterValues, getFilter]);

  return (
    <>
      {mappedFilterValuesForChip && mappedFilterValuesForChip.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 lg:gap-4 my-4">
          {mappedFilterValuesForChip?.map((f, idx) => {
            if (!f?.key) return null;

            return (
              <FilterChip
                key={idx}
                label={f.label as string}
                value={f.value as string}
                onRemove={() => removeFilter(f.key as string)}
              />
            );
          })}
          <button
            aria-label="Fjern filtre"
            className="underline text-sm"
            onClick={resetQueryFilters}
          >
            Fjern filtre
          </button>
        </div>
      ) : null}
    </>
  );
};
