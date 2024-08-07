import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

          return [filterKey, filterValue];
        }),
      );
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
    );
  }, [searchParams]);

  const getQueryFilter = <T>(key: string) => {
    const value = searchParams.get(key);

    if (!value) return undefined;

    return JSON.parse(value) as T;
  };

  const setQueryFilter = (
    key: string,
    value: string | number | boolean | Array<string> | Array<number>,
    filterType?: string | null,
  ) => {
    const query = new URLSearchParams(searchParams.toString());
    const filterKey = `${key}|${filterType}`;

    if (!filterType) return;

    if (isRangeFilter(filterType) && Array.isArray(value)) {
      if (value && value.length === 2) {
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

    if (isTextFilter(filterType)) {
      if (value) {
        query.set(filterKey, JSON.stringify(value));
      } else {
        query.delete(filterKey);
      }
    }

    if (isBooleanFilter(filterType)) {
      if (value) {
        query.set(filterKey, JSON.stringify(value));
      } else {
        query.delete(filterKey);
      }
    }

    if (isSelectFilter(filterType) && Array.isArray(value)) {
      if (value && value.length > 0) {
        query.set(filterKey, JSON.stringify(value));
      } else {
        query.delete(filterKey);
      }
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
    getQueryFilter,
    removeQueryFilter,
    resetQueryFilters,
  };
};
