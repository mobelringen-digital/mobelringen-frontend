import React from "react";

import { Banner } from "components/cms/block-banner";
import { CmsImageGallery } from "components/cms/block-image-gallery";
import { CmsProductSlider } from "components/cms/block-product-slider";

import { BlockFaq } from "@/components/cms/block-faq/BlockFaq";
import { CmsPagesList } from "@/components/cms/block-pages-list/CmsPagesList";
import { BlockQuote } from "@/components/cms/block-quote/BlockQuote";
import { BlockRow } from "@/components/cms/block-row";
import { CmsSimilarPagesRow } from "@/components/cms/block-similar-pages-row/CmsSimilarPagesRow";
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

    case "BlockPagesList":
      return <CmsPagesList data={data} />;

    case "BlockSimilarPagesRow":
      return <CmsSimilarPagesRow data={data} />;

    case "BlockImageGallery":
      return <CmsImageGallery data={data} />;

    case "BlockFaq":
      return <BlockFaq data={data} />;

    default:
      return null;
  }
};
