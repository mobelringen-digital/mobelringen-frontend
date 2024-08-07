import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FiltersFormData } from "@/modules/category/category/category-filters/CategoryFilters";
import {
  isBooleanFilter,
  isRangeFilter,
  isSelectFilter,
  isTextFilter,
} from "@/modules/category/factories";

import { navigate } from "../../../../app/actions";

export const useCategoryFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filtersFormValues = React.useMemo(() => {
    if (searchParams) {
      const search = new URLSearchParams(searchParams.toString());
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
    const search = new URLSearchParams(searchParams.toString());
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

        return [filterKey, filterValue];
      }),
    ) as FiltersFormData;
  }, [searchParams]);

  const setQueryFilter = (
    key: string,
    value: string | number | boolean | Array<string> | Array<number>,
    filterType?: string | null,
  ) => {
    const query = new URLSearchParams(searchParams.toString());
    const filterKey = `${key}|${filterType}`;

    if (!filterType) return;

    if (
      isRangeFilter(filterType) &&
      Array.isArray(value) &&
      value.length === 2
    ) {
      query.append(
        filterKey,
        JSON.stringify({
          from: value[0],
          to: value[1],
        }),
      );
    }

    if (isTextFilter(filterType)) {
      query.set(filterKey, value as string);
    }

    if (isBooleanFilter(filterType)) {
      query.set(filterKey, JSON.stringify(value));
    }

    if (isSelectFilter(filterType)) {
      query.set(filterKey, JSON.stringify(value));
    }

    router.push(`${pathname}?${query}`);
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
    setQueryFilter,
    removeQueryFilter,
    resetQueryFilters,
  };
};
