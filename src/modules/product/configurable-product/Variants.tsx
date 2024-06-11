import React from "react";

import { Variant } from "@/modules/product/configurable-product/Variant";
import { ConfigurableProductVariantsFragment } from "@/queries/configurable-product.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  variantData?: Array<
    FragmentType<typeof ConfigurableProductVariantsFragment>
  > | null;
}

export const Variants: React.FC<Props> = ({ variantData }) => {
  const variants = useFragment(
    ConfigurableProductVariantsFragment,
    variantData,
  );

  return (
    <div className="flex flex-wrap gap-4">
      {variants?.map((variant, idx) => <Variant variant={variant} key={idx} />)}
    </div>
  );
};
