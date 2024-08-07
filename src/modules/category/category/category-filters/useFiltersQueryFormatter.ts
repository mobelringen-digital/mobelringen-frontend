import React from "react";

import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { ProductAggregationsFragment } from "@/types";

export const useFiltersQueryFormatter = (
  filters?: Array<ProductAggregationsFragment | null> | null,
) => {
  const { filtersFormValues } = useCategoryFilters();

  const getFilter = React.useCallback(
    (key: string) => {
      return filters?.find((f) => f?.attribute_code === key);
    },
    [filters],
  );

  const filterValuesForQuery = React.useMemo(() => {
    if (filtersFormValues) {
      return Object.fromEntries(
        Object.entries(filtersFormValues).map(([key, value]) => {
          const filter = getFilter(key);

          if (!filter) return [];

          if (filter.frontend_input === "text") {
            return [key, { match: value }];
          }

          if (filter.frontend_input === "boolean") {
            return [key, { match: value }];
          }

          if (
            filter.frontend_input === "price" &&
            Array.isArray(value) &&
            value.length === 2
          ) {
            return [key, { from: value[0], to: value[1] }];
          }

          if (filter.frontend_input === "select") {
            return [key, { in: value }];
          }

          return [];
        }),
      );
    }
  }, [filtersFormValues, getFilter]);

  return { filterValuesForQuery };
};
