import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FiltersFormData } from "@/modules/category/category/category-filters/CategoryFilters";
import {
  isBooleanFilter,
  isRangeFilter,
  isSelectFilter,
  isTextFilter,
} from "@/modules/category/factories";
import {
  ProductAggregationsFragment,
  ProductAttributeFilterInput,
} from "@/types";

import { navigate } from "../../../../app/actions";

export const useCategoryFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filtersFormValues = React.useMemo(() => {
    if (searchParams) {
      const params = searchParams.toString();
      const search = new URLSearchParams(params);
      const filter = Object.fromEntries(search.entries());

      return Object.fromEntries(
        Object.entries(filter).map(([key, value]) => {
          const filterKey = key.split("|")[0];
          const filterType = key.split("|")[1];
          const filterValue = JSON.parse(value);

          if (isRangeFilter(filterType)) {
            return [filterKey, [filterValue.from, filterValue.to]];
          }

          if (isTextFilter(filterType)) {
            return [filterKey, filterValue];
          }

          if (isBooleanFilter(filterType)) {
            return [filterKey, filterValue];
          }

          if (isSelectFilter(filterType)) {
            return [filterKey, filterValue];
          }

          return [filterKey, filterValue];
        }),
      ) as FiltersFormData;
    }
  }, [searchParams]);

  const filterValuesForQuery = React.useMemo(() => {
    const params = searchParams.toString();
    const search = new URLSearchParams(params);
    const filter = Object.fromEntries(search.entries());

    return Object.fromEntries(
      Object.entries(filter).map(([key, value]) => {
        const filterKey = key.split("|")[0];
        const filterType = key.split("|")[1];
        const filterValue = JSON.parse(value);

        if (isRangeFilter(filterType)) {
          return [filterKey, { from: filterValue[0], to: filterValue[1] }];
        }

        if (isTextFilter(filterType)) {
          return [filterKey, { match: filterValue }];
        }

        if (
          isSelectFilter(filterType) &&
          Array.isArray(filterValue) &&
          filterValue.length > 0
        ) {
          return [filterKey, { in: filterValue }];
        }

        if (
          isBooleanFilter(filterType) &&
          Array.isArray(filterValue) &&
          filterValue.length > 0
        ) {
          return [filterKey, { in: filterValue }];
        }

        return [];
      }),
    );
  }, [searchParams]);

  const setQueryFilters = (
    values: ProductAttributeFilterInput,
    filters?: Array<ProductAggregationsFragment | null> | null,
  ) => {
    const query = new URLSearchParams();

    const getFilter = (key: string) => {
      return filters?.find((f) => f?.attribute_code === key);
    };

    Object.entries(values).forEach(([key, value]) => {
      const filter = getFilter(key);
      const filterKey = `${key}|${filter?.frontend_input}`;
      const filterValue = JSON.stringify(value);

      if (!filter || !filter.frontend_input) return;
      if (!filterValue) return;

      if (isTextFilter(filter.frontend_input)) {
        if (value) {
          query.append(filterKey, filterValue);
        } else {
          query.delete(filterKey);
        }
      }

      if (isBooleanFilter(filter.frontend_input)) {
        if (value) {
          query.append(filterKey, filterValue);
        } else {
          query.delete(filterKey);
        }
      }

      if (isSelectFilter(filter.frontend_input)) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            query.append(filterKey, filterValue);
          } else {
            query.delete(filterKey);
          }
        }
      }

      if (isRangeFilter(filter.frontend_input)) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            query.append(
              filterKey,
              JSON.stringify({
                from: value[0],
                to: value[1],
              }),
            );
          } else {
            query.delete(filterKey);
          }
        }
      }
    });

    router.push(`${pathname}?${query.toString()}`);
  };

  const removeQueryFilter = (key: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.delete(key);

    router.push(`${pathname}?${query}`);
  };

  const resetQueryFilters = async () => {
    return navigate(pathname);
  };

  return {
    filtersFormValues,
    filterValuesForQuery,
    setQueryFilters,
    removeQueryFilter,
    resetQueryFilters,
  };
};
