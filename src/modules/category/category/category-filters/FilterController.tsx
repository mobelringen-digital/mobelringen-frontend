import React from "react";

import { Control } from "react-hook-form";

import { FiltersFormData } from "@/modules/category/category/category-filters/CategoryFilters";
import { FilterBoolean } from "@/modules/category/category/category-filters/filters/FilterBoolean";
import { FilterPrice } from "@/modules/category/category/category-filters/filters/FilterPrice";
import { FilterSelect } from "@/modules/category/category/category-filters/filters/FilterSelect";
import { FilterText } from "@/modules/category/category/category-filters/filters/FilterText";
import { ProductAggregationsFragment } from "@/types";

interface Props {
  filter: ProductAggregationsFragment | null;
  control: Control<FiltersFormData>;
}

export const FilterController: React.FC<Props> = ({ filter, control }) => {
  if (!filter) return null;

  return (
    <div className="px-8">
      {filter.frontend_input === "text" ? (
        <FilterText control={control} data={filter} />
      ) : null}

      {filter.frontend_input === "select" ? (
        <FilterSelect control={control} data={filter} />
      ) : null}

      {filter.frontend_input === "boolean" ? (
        <FilterBoolean control={control} data={filter} />
      ) : null}

      {filter.frontend_input === "price" ? (
        <FilterPrice control={control} data={filter} />
      ) : null}
    </div>
  );
};
