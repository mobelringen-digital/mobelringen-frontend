import React from "react";

import { Slider } from "@nextui-org/react";
import { Control } from "react-hook-form";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { FiltersFormData } from "@/modules/category/category/category-filters/CategoryFilters";
import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import {
  ProductAggregationsFragment,
  ProductAttributeFilterInput,
} from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
  control: Control<FiltersFormData>;
}

export const FilterPrice: React.FC<Props> = ({ data, control }) => {
  const { setQueryFilter } = useCategoryFilters();
  if (!data) return null;

  const onFilterChange = (value: number | number[]) => {
    setQueryFilter(data.attribute_code, value, data.frontend_input);
  };

  const getMinMax = () => {
    let min = 9999;
    let max = 118640;

    data.options?.forEach((option) => {
      const value = Number(option?.value);

      if (value < min) {
        min = value;
      }

      if (value > max) {
        max = value;
      }
    });

    return { min, max };
  };

  return (
    <FilterWrapper title={data.label}>
      <FieldWrapper
        aria-label={data.label}
        control={control}
        name={data.attribute_code as keyof ProductAttributeFilterInput}
      >
        <Slider
          onChange={onFilterChange}
          aria-label={String(data.label)}
          step={1000}
          minValue={getMinMax().min || 9999}
          maxValue={getMinMax().max || 200000}
          defaultValue={[getMinMax().min || 9999, getMinMax().max || 200000]}
          formatOptions={{ style: "currency", currency: "NOK" }}
          showTooltip={true}
        />
      </FieldWrapper>

      <div className="flex justify-center mt-2 text-grey text-sm">
        {data.count} produkter
      </div>
    </FilterWrapper>
  );
};
