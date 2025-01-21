import React from "react";

import RangeSlider from "react-range-slider-input";

import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { FilterRangeTypeInput, ProductAggregationsFragment } from "@/types";
import { useQueryParams } from "@/utils/hooks/useQueryParams";

import "react-range-slider-input/dist/style.css";

interface Props {
  data: ProductAggregationsFragment | null;
}

export const FilterPrice: React.FC<Props> = ({ data }) => {
  const [sliderValue, setSliderValue] = React.useState<[number, number]>();
  const { setFilter, getFilter, removeFilter } = useQueryParams();

  const filter = getFilter<FilterRangeTypeInput>(data?.attribute_code ?? "");
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
      setFilter(data.attribute_code, { from: val[0], to: val[1] });
    } else {
      removeFilter(data.attribute_code);
    }
  };

  const getDefaultValues = () => {
    let min = 9999;
    let max = 118640;
    let step = 1000;

    if (data.options && data.options.length > 1) {
      step = Number(data.options[0]?.value) - Number(data.options[1]?.value);
    }

    data.options?.forEach((option) => {
      const opt = Number(option?.value);

      if (opt < min) {
        min = opt;
      }

      if (opt > max) {
        max = opt;
      }
    });

    return { min, max, step };
  };

  const displayValue = () => {
    if (sliderValue) {
      return `${sliderValue?.[0]} NOK - ${sliderValue?.[1]} NOK`;
    }

    if (value) {
      return `${value?.[0]} NOK - ${value?.[1]} NOK`;
    }

    return `${getDefaultValues().min} NOK - ${getDefaultValues().max} NOK`;
  };

  return (
    <FilterWrapper title={data.label}>
      <RangeSlider
        className="filter-range-slider"
        min={getDefaultValues().min || 9999}
        max={getDefaultValues().max || 200000}
        step={getDefaultValues().step}
        defaultValue={[
          getDefaultValues().min || 9999,
          getDefaultValues().max || 200000,
        ]}
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
