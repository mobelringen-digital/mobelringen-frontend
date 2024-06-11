"use client";

import React from "react";

import { useActiveProductData } from "@/modules/product/active-product-data-provider/useActiveProductData";
import { ConfigurableProductOptionsFragment } from "@/queries/configurable-product.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  configurableOptionsData: FragmentType<
    typeof ConfigurableProductOptionsFragment
  >[];
}

export const ConfigurationInfo: React.FC<Props> = ({
  configurableOptionsData,
}) => {
  const { activeProductVariant } = useActiveProductData();
  const configurations = useFragment(
    ConfigurableProductOptionsFragment,
    configurableOptionsData,
  );

  if (!activeProductVariant) return null;

  const activeAttributes = activeProductVariant.variant?.attributes?.map(
    (attr) => attr?.value_index,
  );

  const options = configurations.filter((conf) =>
    conf.values?.find((val) => activeAttributes?.includes(val?.value_index)),
  );

  return (
    <div className="flex flex-col gap-2">
      {options.map((option, idx) => (
        <div key={idx} className="flex flex-wrap">
          <span className="text-sm lg:text-base font-semibold capitalize mr-1">
            {option.label}
          </span>
          {option.values
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
