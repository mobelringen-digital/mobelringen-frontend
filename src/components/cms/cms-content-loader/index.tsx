import React from "react";

import { Banner } from "@/components/cms/banner";
import { BlockQuote } from "@/components/cms/block-quote/BlockQuote";
import { BlockRow } from "@/components/cms/block-row";
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

    case "BlockRow":
      return <BlockRow data={data} />;

    case "BlockQuote":
      return <BlockQuote data={data} />;

    default:
      return null;
  }
};
