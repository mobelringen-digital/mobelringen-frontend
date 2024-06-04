import React from "react";

import { PopularProducts } from "@/components/cms/popular-products";
import { CmsPagesQuery } from "@/types";
import { ArrayElement } from "@/utils/ts-utils";

import { Banner } from "../banner";

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

    case "PopularProduct":
      return <PopularProducts data={data} />;

    default:
      return null;
  }
};
