"use client";

import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { useProductSliderDataQuery } from "@/components/product/hooks/useProductSliderDataQuery";
import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { useActiveProductData } from "@/modules/product/active-product-data-provider/useActiveProductData";
import { PurchaseBlock } from "@/modules/product/add-to-cart/PurchaseBlock";
import { InformationAccordion } from "@/modules/product/information-accordion/InformationAccordion";
import { MoreInformation } from "@/modules/product/MoreInformation";
import { MoreInTheStore } from "@/modules/product/MoreInTheStore";
import { ProductGallery } from "@/modules/product/product-gallery/ProductGallery";
import { ProductPricing } from "@/modules/product/product-pricing/ProductPricing";
import { ProductTopInfo } from "@/modules/product/ProductTopInfo";
import {
  BaseCartFragment,
  BaseProductFragment as BaseProductFragmentType,
} from "@/types";

interface Props {
  baseProductData: BaseProductFragmentType;
  configurationBlock?: React.ReactNode;
  productGallery?: React.ReactNode;
  cart?: BaseCartFragment | null;
}

export const BaseProductLayout: React.FC<Props> = ({
  baseProductData,
  configurationBlock,
  cart,
}) => {
  const { activeProductVariant } = useActiveProductData();

  const product = activeProductVariant.variant?.product ?? baseProductData;
  const { data: productSliderData, isLoading: isSlidersDataLoading } =
    useProductSliderDataQuery(product.sku);

  return (
    <>
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
            <ProductGallery product={product} />
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
            <PurchaseBlock cart={cart} product={product} />
            <div className="block lg:hidden">
              <InformationAccordion product={product} />
            </div>
          </div>
        </div>
        <Debugger data={baseProductData} />
      </ContainerLayout>

      <MoreInformation />

      <ContainerLayout>
        {isSlidersDataLoading ? (
          <LoaderInnerWrapper>
            <Loader />
          </LoaderInnerWrapper>
        ) : (
          <>
            {productSliderData?.series ? (
              <ProductSlider
                title="Utforsk serien"
                data={productSliderData.series}
              />
            ) : null}

            {productSliderData?.related_products ? (
              <ProductSlider
                title="Relaterte produkter"
                data={productSliderData.related_products}
              />
            ) : null}

            {productSliderData?.upsell_products ? (
              <ProductSlider
                title="Gi møblene nytt liv"
                data={productSliderData.upsell_products}
              />
            ) : null}
          </>
        )}
      </ContainerLayout>
    </>
  );
};
