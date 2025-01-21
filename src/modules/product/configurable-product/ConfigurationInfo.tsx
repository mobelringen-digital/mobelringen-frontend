"use client";

import React from "react";

import {
  ConfigurableProductOptionsFragment,
  ConfigurableProductVariantsFragment,
} from "@/types";

interface Props {
  activeProductVariant?: ConfigurableProductVariantsFragment | null;
  configurations?: Array<ConfigurableProductOptionsFragment | null> | null;
}

export const ConfigurationInfo: React.FC<Props> = ({
  activeProductVariant,
  configurations,
}) => {
  if (!activeProductVariant) return null;

  const activeAttributes = activeProductVariant?.attributes?.map(
    (attr) => attr?.value_index,
  );

  const options = configurations?.filter((conf) =>
    conf?.values?.find((val) => activeAttributes?.includes(val?.value_index)),
  );

  return (
    <div className="flex flex-col gap-2">
      {options?.map((option, idx) => (
        <div key={idx} className="flex flex-wrap">
          <span className="text-sm lg:text-base font-semibold capitalize mr-1">
            {option?.label}
          </span>
          {option?.values
            ?.filter((v) => activeAttributes?.includes(v?.value_index))
            .map((val, index) => (
              <span key={index} className="text-sm lg:text-base text-dark-grey">
                {val?.label}
              </span>
            ))}
        </div>
      ))}
    </div>
  );
};
