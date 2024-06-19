import React from "react";

import { Banner } from "@/components/cms/banner";
import { CmsProductSlider } from "@/components/cms/product-slider";
import { CmsPagesQuery } from "@/types";
import { ArrayElement } from "@/utils/ts-utils";

interface CmsContentProps {
  data: ArrayElement<
    NonNullable<NonNullable<CmsPagesQuery["pages"]>[0]>["content"]
  >;
}

export const CmsContentLoader: React.FC<CmsContentProps> = ({ data }) => {
  if (!data.__typename) {
    return null;
  }

  switch (data.__typename) {
    case "Banner":
      return <Banner data={data} />;

    case "ProductSlider":
      return <CmsProductSlider data={data} />;

    default:
      return null;
  }
};
