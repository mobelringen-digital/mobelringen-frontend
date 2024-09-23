import React from "react";

import qs from "qs";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useCategoryFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filterValues = React.useMemo(() => {
    if (searchParams) {
      const search = new URLSearchParams(searchParams.toString());
      const filter = Object.fromEntries(search.entries());

      const values = Object.fromEntries(
        Object.entries(filter).map(([key, value]) => {
          return [key, qs.parse(value)];
        }),
      );

      if ("sort" in values) {
        delete values.sort;
      }

      return values;
    }
  }, [searchParams]);

  const sortValues = React.useMemo(() => {
    if (searchParams) {
      const search = new URLSearchParams(searchParams.toString());
      const sort = search.get("sort");

      if (sort) {
        return qs.parse(sort);
      }
    }
  }, [searchParams]);

  const getQueryFilter = <T>(key: string) => {
    const value = searchParams.get(key);

    if (!value) return undefined;

    return qs.parse(value) as T;
  };

  const setQueryFilter = (key: string, value: string) => {
    const query = new URLSearchParams(searchParams.toString());

    if (value) {
      query.set(key, value);
    } else {
      query.delete(key);
    }

    router.push(`${pathname}?${query}`);
  };

  const removeQueryFilter = (key: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.delete(key);

    router.push(`${pathname}?${query}`);
  };

  const resetQueryFilters = () => {
    const q = searchParams.get("q");
    if (q) {
      return router.push(`${pathname}?q=${q}`);
    }
    return router.push(pathname);
  };

  return {
    filterValues,
    sortValues,
    setQueryFilter,
    getQueryFilter,
    removeQueryFilter,
    resetQueryFilters,
  };
};
