"use client";

import React from "react";

import { Variant } from "@/modules/product/configurable-product/Variant";
import { ConfigurableProductVariantsFragment } from "@/types";

interface Props {
  variants?: Array<ConfigurableProductVariantsFragment | null> | null;
}

export const Variants: React.FC<Props> = ({ variants }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-between lg:justify-start">
      {variants?.map((variant, idx) => <Variant variant={variant} key={idx} />)}
    </div>
  );
};
