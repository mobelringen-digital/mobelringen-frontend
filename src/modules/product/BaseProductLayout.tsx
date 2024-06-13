"use client";

import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { useActiveProductData } from "@/modules/product/active-product-data-provider/useActiveProductData";
import { PurchaseBlock } from "@/modules/product/add-to-cart/PurchaseBlock";
import { InformationAccordion } from "@/modules/product/information-accordion/InformationAccordion";
import { MoreInTheStore } from "@/modules/product/MoreInTheStore";
import { ProductGallery } from "@/modules/product/product-gallery/ProductGallery";
import { ProductPricing } from "@/modules/product/product-pricing/ProductPricing";
import { ProductTopInfo } from "@/modules/product/ProductTopInfo";
import { RelatedProducts } from "@/modules/product/related-products/RelatedProducts";
import { ProductSeries } from "@/modules/product/series/ProductSeries";
import { BaseProductFragment as BaseProductFragmentType } from "@/types";

interface Props {
  baseProductData: BaseProductFragmentType;
  configurationBlock?: React.ReactNode;
  productGallery?: React.ReactNode;
}

export const BaseProductLayout: React.FC<Props> = ({
  baseProductData,
  configurationBlock,
}) => {
  const { activeProductVariant } = useActiveProductData();

  const product = activeProductVariant.variant?.product ?? baseProductData;

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
            image={product?.image}
            gallery={product?.media_gallery}
            labels={product?.productLabel}
            priceRange={product?.price_range}
          />
          <div className="hidden lg:block">
            <InformationAccordion product={product} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          <ProductTopInfo
            brand={product?.productBrand?.name}
            name={product?.name}
            shortDescription={product?.short_description?.html}
          />

          {configurationBlock}

          <ProductPricing pricingRange={product?.price_range} />
          <MoreInTheStore />
          <PurchaseBlock product={product} />
          <div className="block lg:hidden">
            <InformationAccordion product={product} />
          </div>
        </div>
      </div>

      <ProductSeries sku={product.sku} />
      <RelatedProducts sku={product.sku} />

      <Debugger data={baseProductData} />
    </ContainerLayout>
  );
};
