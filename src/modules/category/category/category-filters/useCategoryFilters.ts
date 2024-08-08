import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useCategoryFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filterValues = React.useMemo(() => {
    if (searchParams) {
      const search = new URLSearchParams(searchParams.toString());
      const filter = Object.fromEntries(search.entries());

      return Object.fromEntries(
        Object.entries(filter).map(([key, value]) => {
          return [key, JSON.parse(value)];
        }),
      );
    }
  }, [searchParams]);

  const getQueryFilter = <T>(key: string) => {
    const value = searchParams.get(key);

    if (!value) return undefined;

    return JSON.parse(value) as T;
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
    router.push(pathname);
  };

  return {
    filterValues,
    setQueryFilter,
    getQueryFilter,
    removeQueryFilter,
    resetQueryFilters,
  };
};
