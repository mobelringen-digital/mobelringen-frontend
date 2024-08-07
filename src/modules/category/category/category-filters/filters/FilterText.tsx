import React from "react";

import { Radio, RadioGroup } from "@nextui-org/react";
import { Control } from "react-hook-form";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { FiltersFormData } from "@/modules/category/category/category-filters/CategoryFilters";
import { FilterWrapper } from "@/modules/category/category/category-filters/FilterWrapper";
import {
  ProductAggregationsFragment,
  ProductAttributeFilterInput,
} from "@/types";

interface Props {
  data: ProductAggregationsFragment | null;
  control: Control<FiltersFormData>;
}

export const FilterText: React.FC<Props> = ({ data, control }) => {
  if (!data) return null;

  return (
    <FilterWrapper title={data.label}>
      <FieldWrapper
        aria-label={data.label}
        control={control}
        name={data.attribute_code as keyof ProductAttributeFilterInput}
      >
        <RadioGroup aria-label={String(data.label)}>
          {data.options?.map((option, idx) => (
            <Radio key={idx} value={option?.value as string}>
              {option?.label} ({option?.count})
            </Radio>
          ))}
        </RadioGroup>
      </FieldWrapper>
    </FilterWrapper>
  );
};
