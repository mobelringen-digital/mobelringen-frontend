import { useCallback, useMemo } from "react";

import qs from "qs";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useFiltersQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setFilters = (filter: Record<string, any>) => {
    const query = qs.stringify(
      {
        filters: filter,
      },
      {
        skipNulls: true,
        encode: false,
        allowDots: true,
      },
    );

    return router.push(`${pathname}?${query}`);
  };

  const getFilters = useCallback(() => {
    const decodedFilters = qs.parse(searchParams.toString(), {
      allowDots: true,
    });
    return decodedFilters.filters as Record<string, any>;
  }, [searchParams]);

  const setFilter = (key: string, value: any) => {
    const filters = getFilters() || {};

    filters[key] = value;

    setFilters(filters);
  };

  const getFilter = <T>(key: string) => {
    const filters = getFilters();

    if (!filters) return undefined;

    return filters[key] as T;
  };

  const removeFilter = (key: string) => {
    const filters = getFilters();

    if (!filters) return;

    delete filters[key];

    setFilters(filters);
  };

  const filterValues = useMemo(() => {
    const filters = getFilters();

    if (!filters) return {};

    return filters;
  }, [getFilters]);

  const resetQueryFilters = () => {
    router.push(`${pathname}`);
  };

  return {
    setFilter,
    getFilter,
    getFilters,
    setFilters,
    removeFilter,
    filterValues,
    resetQueryFilters,
  };
};
