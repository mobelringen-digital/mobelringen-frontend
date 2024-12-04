import React from "react";

import cx from "classnames";

import { FilterBoolean } from "@/modules/category/category/category-filters/filters/FilterBoolean";
import { FilterPrice } from "@/modules/category/category/category-filters/filters/FilterPrice";
import { FilterSelect } from "@/modules/category/category/category-filters/filters/FilterSelect";
import { FilterText } from "@/modules/category/category/category-filters/filters/FilterText";
import { ProductAggregationsFragment } from "@/types";

interface Props {
  filter: ProductAggregationsFragment | null;
  isLastElement?: boolean;
}

export const FilterController: React.FC<Props> = ({
  filter,
  isLastElement,
}) => {
  if (!filter) return null;

  return (
    <div
      className={cx("px-8", {
        "pb-[85px]": isLastElement,
      })}
    >
      {filter.frontend_input === "text" ? <FilterText data={filter} /> : null}

      {filter.frontend_input === "select" ? (
        <FilterSelect data={filter} />
      ) : null}

      {filter.frontend_input === "boolean" ? (
        <FilterBoolean data={filter} />
      ) : null}

      {filter.frontend_input === "price" ? <FilterPrice data={filter} /> : null}
    </div>
  );
};
