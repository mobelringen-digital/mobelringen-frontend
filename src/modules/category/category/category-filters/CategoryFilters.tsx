import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { Filters } from "@/components/_ui/icons/figma/Filters";
import { FilterChips } from "@/modules/category/category/category-filters/chips/FilterChips";
import { FilterActions } from "@/modules/category/category/category-filters/FilterActions";
import { FilterController } from "@/modules/category/category/category-filters/FilterController";
import { FiltersDrawer } from "@/modules/category/category/category-filters/FiltersDrawer";
import { SortButton } from "@/modules/category/category/category-filters/SortButton";
import { useFiltersQuery } from "@/modules/category/category/category-filters/useFiltersQuery";
import { ProductAggregationsFragment } from "@/types";
import { useDetectOutsideClick } from "@/utils/hooks/useDetectOutsideClick";

interface Props {
  totalCount?: number | null;
  filters?: Array<ProductAggregationsFragment | null> | null;
}

export const CategoryFilters: React.FC<Props> = ({ filters, totalCount }) => {
  const ref = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(ref, false);
  const { resetQueryFilters } = useFiltersQuery();

  const resetForm = async () => {
    return resetQueryFilters();
  };

  return (
    <div className="mb-4">
      <FiltersDrawer
        title="Filter"
        onClose={() => setIsActive(false)}
        ref={ref}
        isOpen={isActive}
      >
        {filters?.map((filter, idx) => {
          return (
            <FilterController
              isLastElement={idx === filters.length - 1}
              filter={filter}
              key={idx}
            />
          );
        })}
        <FilterActions onReset={resetForm} onClose={() => setIsActive(false)} />
      </FiltersDrawer>

      <div className="flex justify-between items-start">
        <Button
          aria-label="Alle filtre"
          color="grey"
          className="flex items-center gap-2"
          onClick={() => setIsActive((prev) => !prev)}
        >
          Alle filtre <Filters />
        </Button>
        <SortButton />
      </div>
      <div className="flex flex-col gap-4">
        <FilterChips filters={filters} />

        {totalCount ? (
          <div className="text-grey text-sm mt-8 mb-4">
            {totalCount} produkter
          </div>
        ) : null}
      </div>
    </div>
  );
};
