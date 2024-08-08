import React from "react";

import RangeSlider from "react-range-slider-input";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import { FilterRangeTypeInput, ProductAggregationsFragment } from "@/types";
import "react-range-slider-input/dist/style.css";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterPrice: React.FC<Props> = ({ data }) => {
  const [sliderValue, setSliderValue] = React.useState<[number, number]>();
  const { setQueryFilter, getQueryFilter, removeQueryFilter } =
    useCategoryFilters();

  const filter = getQueryFilter<FilterRangeTypeInput>(
    data?.attribute_code ?? "",
  );
  const value = React.useMemo(() => {
    if (!filter) return undefined;

    if (filter.from && filter.to) {
      return [parseInt(filter.from), parseInt(filter.to)] as [number, number];
    }
  }, [filter]);

  if (!data?.attribute_code) return null;
  if (!data) return null;

  const onFilterChange = (val?: number | number[]) => {
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

  const displayValue = () => {
    if (sliderValue) {
      return `${sliderValue?.[0]} NOK - ${sliderValue?.[1]} NOK`;
    }

    if (value) {
      return `${value?.[0]} NOK - ${value?.[1]} NOK`;
    }

    return `${getMinMax().min} NOK - ${getMinMax().max} NOK`;
  };

  return (
    <FilterWrapper title={data.label}>
      <RangeSlider
        className="filter-range-slider"
        min={getMinMax().min || 9999}
        max={getMinMax().max || 200000}
        step={1000}
        defaultValue={[getMinMax().min || 9999, getMinMax().max || 200000]}
        value={sliderValue ?? value}
        onInput={(val) => setSliderValue(val)}
        onRangeDragEnd={() => onFilterChange(sliderValue)}
        onThumbDragEnd={() => onFilterChange(sliderValue)}
      />

      <div className="flex justify-center mt-2 text-grey text-xs">
        {`Pris: ${displayValue()}`}
      </div>

      <div className="flex justify-center mt-2 text-grey text-sm">
        {data.count} produkter
      </div>
    </FilterWrapper>
  );
};
