import React from "react";

import { Slider } from "@nextui-org/react";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { FilterRangeTypeInput, ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterPrice: React.FC<Props> = ({ data }) => {
  const { setQueryFilter, getQueryFilter, removeQueryFilter } =
    useCategoryFilters();

  const filter = getQueryFilter<FilterRangeTypeInput>(
    data?.attribute_code ?? "",
  );
  const value = React.useMemo(() => {
    if (!filter) return undefined;

    if (filter.from && filter.to) {
      return [parseInt(filter.from), parseInt(filter.to)];
    }
  }, [filter]);

  if (!data?.attribute_code) return null;
  if (!data) return null;

  const onFilterChange = (val: number | number[]) => {
    if (!Array.isArray(val)) return;

    if (val.length === 2) {
      setQueryFilter(
        data.attribute_code,
        JSON.stringify({ from: val[0], to: val[1] }),
      );
    } else {
      removeQueryFilter(data.attribute_code);
    }
  };

  const getMinMax = () => {
    let min = 9999;
    let max = 118640;

    data.options?.forEach((option) => {
      const opt = Number(option?.value);

      if (opt < min) {
        min = opt;
      }

      if (opt > max) {
        max = opt;
      }
    });

    return { min, max };
  };

  return (
    <FilterWrapper title={data.label}>
      <Slider
        value={value}
        onChange={onFilterChange}
        aria-label={String(data.label)}
        step={1000}
        minValue={getMinMax().min || 9999}
        maxValue={getMinMax().max || 200000}
        defaultValue={[getMinMax().min || 9999, getMinMax().max || 200000]}
        formatOptions={{ style: "currency", currency: "NOK" }}
        showTooltip={true}
      />

      <div className="flex justify-center mt-2 text-grey text-sm">
        {data.count} produkter
      </div>
    </FilterWrapper>
  );
};
