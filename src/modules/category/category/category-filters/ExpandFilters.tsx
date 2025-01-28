import React from "react";

import { ProductAggregationsFragment } from "@/types";
import { FILTERS_INITIAL_COUNT } from "@/utils/helpers";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  data: ProductAggregationsFragment | null;
  showAll: boolean;
}

export const ExpandFilters: React.FC<Props> = ({ onClick, data, showAll }) => {
  if (!data) return null;

  return (
    <>
      {data.options && data.options?.length > FILTERS_INITIAL_COUNT ? (
        <div className="flex w-full justify-center mt-2">
          <button
            type="button"
            className="text-sm mt-2 text-gray-500 underline"
            onClick={onClick}
          >
            {showAll ? (
              <>Vis færre</>
            ) : (
              <>Vis flere ({data.options?.length - FILTERS_INITIAL_COUNT})</>
            )}
          </button>
        </div>
      ) : null}
    </>
  );
};
