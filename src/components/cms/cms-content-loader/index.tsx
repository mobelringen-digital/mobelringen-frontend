import React from "react";

import { Banner } from "components/cms/block-banner";
import { CmsImageGallery } from "components/cms/block-image-gallery";
import { CmsProductSlider } from "components/cms/block-product-slider";

import { BlockBrands } from "@/components/cms/block-brands/BlockBrands";
import { BlockBrandsList } from "@/components/cms/block-brands-list/BlockBrandsList";
import { BlockCatalog } from "@/components/cms/block-catalog/BlockCatalog";
import { BlockFaq } from "@/components/cms/block-faq/BlockFaq";
import { BlockFlowbox } from "@/components/cms/block-flowbox/BlockFlowbox";
import { BlockHTMLCode } from "@/components/cms/block-html-code/BlockHTMLCode";
import { BlockImageLinksSlider } from "@/components/cms/block-image-links-slider/BlockImageLinksSlider";
import { BlockNavigationButtons } from "@/components/cms/block-navigation-buttons/BlockNavigationButtons";
import { CmsPagesList } from "@/components/cms/block-pages-list/CmsPagesList";
import { BlockPressRoom } from "@/components/cms/block-press-room/BlockPressRoom";
import { BlockProductsList } from "@/components/cms/block-products-list/BlockProductsList";
import { BlockQuote } from "@/components/cms/block-quote/BlockQuote";
import { BlockRow } from "@/components/cms/block-row";
import { CmsSimilarPagesRow } from "@/components/cms/block-similar-pages-row/CmsSimilarPagesRow";
import { BlockStoreElement } from "@/components/cms/block-store-element/BlockStoreElement";
import { BlockStoresMap } from "@/components/cms/block-stores-map/BlockStoresMap";
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

    case "BlockNavigationButton":
      return <BlockNavigationButtons data={data} />;

    case "BlockImageLinksSlider":
      return <BlockImageLinksSlider data={data} />;

    case "BlockBrand":
      return <BlockBrands data={data} />;

    case "BlockStoresMap":
      return <BlockStoresMap data={data} />;

    case "BlockPressRoom":
      return <BlockPressRoom data={data} />;

    case "BlockProductsList":
      return <BlockProductsList data={data} />;

    case "BlockBrandsList":
      return <BlockBrandsList data={data} />;

    case "BlockFlowbox":
      return <BlockFlowbox data={data} />;

    case "BlockCatalog":
      return <BlockCatalog data={data} />;

    case "BlockHtmlCode":
      return <BlockHTMLCode data={data} />;

    case "BlockStoreElement":
      return <BlockStoreElement data={data} />;

    default:
      return null;
  }
};
