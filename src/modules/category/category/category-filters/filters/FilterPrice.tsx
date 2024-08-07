import React from "react";

import { Slider } from "@nextui-org/react";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { ProductAggregationsFragment } from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterPrice: React.FC<Props> = ({ data }) => {
  const { setQueryFilter, getQueryFilter } = useCategoryFilters();

  const value = getQueryFilter<{ from: number; to: number }>(
    `${data?.attribute_code}|${data?.frontend_input}`,
  );

  const sliderValue = React.useMemo(() => {
    if (value?.from && value?.to) {
      return [value.from, value.to];
    }

    return undefined;
  }, [value]);

  if (!data) return null;

  const onFilterChange = (val: number | number[]) => {
    setQueryFilter(data.attribute_code, val, data.frontend_input);
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
        value={sliderValue}
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
