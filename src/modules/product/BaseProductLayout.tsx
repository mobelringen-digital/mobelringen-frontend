import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { InformationAccordion } from "@/modules/product/information-accordion/InformationAccordion";
import { MoreInTheStore } from "@/modules/product/MoreInTheStore";
import { ProductGallery } from "@/modules/product/product-gallery/ProductGallery";
import { ProductPricing } from "@/modules/product/product-pricing/ProductPricing";
import { ProductTopInfo } from "@/modules/product/ProductTopInfo";
import { BaseProductFragment } from "@/types";

interface Props {
  baseProductData: BaseProductFragment;
  purchaseBlock: React.ReactNode;
  configurationBlock?: React.ReactNode;
}

export const BaseProductLayout: React.FC<Props> = ({
  baseProductData,
  purchaseBlock,
  configurationBlock,
}) => {
  return (
    <ContainerLayout>
      {baseProductData?.categories ? (
        <Breadcrumbs
          data={baseProductData.categories
            .filter((c) => !c?.url_path?.includes("merker"))
            .map((cat) => ({
              label: cat?.name ?? "",
              url: `/${cat?.url_path}`,
            }))}
        />
      ) : null}

      <div className="grid grid-cols-12 gap-4 lg:gap-16">
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-12">
          <ProductGallery
            imageData={baseProductData?.image}
            // @ts-expect-error An issue with codegen an array of fragments
            galleryData={baseProductData?.media_gallery}
            labelData={baseProductData?.productLabel}
            priceRangeData={baseProductData?.price_range}
          />
          <div className="hidden lg:block">
            <InformationAccordion product={baseProductData} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          <ProductTopInfo
            brand={baseProductData?.productBrand?.name}
            name={baseProductData?.name}
            shortDescription={baseProductData?.short_description?.html}
          />

          {configurationBlock}

          <ProductPricing priceRangeData={baseProductData?.price_range} />
          <MoreInTheStore />

          {purchaseBlock}

          <div className="block lg:hidden">
            <InformationAccordion product={baseProductData} />
          </div>
        </div>
      </div>
      <Debugger data={baseProductData} />
    </ContainerLayout>
  );
};
