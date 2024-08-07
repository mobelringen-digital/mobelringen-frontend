import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { Filters } from "@/components/_ui/icons/figma/Filters";
import { FilterActions } from "@/modules/category/category/category-filters/FilterActions";
import { FilterChips } from "@/modules/category/category/category-filters/FilterChips";
import { FilterController } from "@/modules/category/category/category-filters/FilterController";
import { FiltersDrawer } from "@/modules/category/category/category-filters/FiltersDrawer";
import { useCategoryFilters } from "@/modules/category/category/category-filters/useCategoryFilters";
import {
  InputMaybe,
  ProductAggregationsFragment,
  ProductAttributeFilterInput,
} from "@/types";
import { useDetectOutsideClick } from "@/utils/hooks/useDetectOutsideClick";

interface Props {
  totalCount?: number | null;
  filters?: Array<ProductAggregationsFragment | null> | null;
  defaultFilterValues?: FiltersFormData;
}

export type FiltersFormData = NonNullable<
  InputMaybe<ProductAttributeFilterInput>
>;

export const CategoryFilters: React.FC<Props> = ({
  filters,
  defaultFilterValues,
  totalCount,
}) => {
  const ref = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(ref, false);
  const { control, handleSubmit } = useForm<FiltersFormData>({
    defaultValues: defaultFilterValues,
  });
  const { setQueryFilters, resetQueryFilters } = useCategoryFilters();

  const onSubmit: SubmitHandler<FiltersFormData> = async (values) => {
    return setQueryFilters(values, filters);
  };

  return (
    <div className="mb-8">
      <FiltersDrawer
        title="Filter"
        onClose={() => setIsActive(false)}
        ref={ref}
        isOpen={isActive}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {filters?.map((filter, idx) => {
            return (
              <FilterController control={control} filter={filter} key={idx} />
            );
          })}
          <FilterActions
            onReset={resetQueryFilters}
            onClose={() => setIsActive(false)}
          />
        </form>
      </FiltersDrawer>

      <div className="flex flex-col gap-4">
        <Button
          color="grey"
          className="flex items-center gap-2 w-44"
          onClick={() => setIsActive((prev) => !prev)}
        >
          Alle filtre <Filters />
        </Button>

        <FilterChips filters={filters} />

        {totalCount ? (
          <div className="text-grey text-sm my-4">{totalCount} produkter</div>
        ) : null}
      </div>
    </div>
  );
};
