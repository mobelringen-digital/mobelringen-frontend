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
    <div className="flex flex-col">
      {options.map((option, idx) => (
        <div key={idx} className="flex gap-2">
          <span className="text-base font-semibold capitalize">
            {option.label}
          </span>
          {option.values
            ?.filter((v) => activeAttributes?.includes(v?.value_index))
            .map((val, index) => (
              <span key={index} className="text-base text-dark-grey">
                {val?.label}
              </span>
            ))}
        </div>
      ))}
    </div>
  );
};
