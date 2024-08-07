import React from "react";

import { Checkbox, CheckboxGroup } from "@nextui-org/react";
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

export const FilterSelect: React.FC<Props> = ({ data, control }) => {
  const { setQueryFilter } = useCategoryFilters();
  if (!data) return null;

  const onFilterChange = (value: string[]) => {
    setQueryFilter(data.attribute_code, value, data.frontend_input);
  };

  return (
    <FilterWrapper title={data.label}>
      <FieldWrapper
        aria-label={data.label}
        control={control}
        name={data.attribute_code as keyof ProductAttributeFilterInput}
      >
        <CheckboxGroup
          aria-label={String(data.label)}
          onValueChange={onFilterChange}
        >
          {data.options?.map((option, idx) => (
            <Checkbox key={idx} value={option?.value as string}>
              {option?.label} ({option?.count})
            </Checkbox>
          ))}
        </CheckboxGroup>
      </FieldWrapper>
    </FilterWrapper>
  );
};
