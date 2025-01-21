import { useCallback, useMemo } from "react";

import qs from "qs";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useFiltersQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setFilters = (filter: Record<string, any>) => {
    const params = getQueryParams() ?? {};
    params.filters = filter;

    const query = qs.stringify(params, {
      skipNulls: true,
      encode: false,
      allowDots: true,
    });

    return router.push(`${pathname}?${query}`);
  };

  const getQueryParams = useCallback(() => {
    const params = qs.parse(searchParams.toString(), {
      allowDots: true,
    });

    return params as Record<string, any>;
  }, [searchParams]);

  const getFilters = useCallback(() => {
    const params = getQueryParams();

    return params.filters as Record<string, any>;
  }, [getQueryParams]);

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
