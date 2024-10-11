"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { useSearchParams } from "next/navigation";

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
import { MoreInTheStore } from "@/modules/product/more-in-the-store/MoreInTheStore";
import { MoreInformation } from "@/modules/product/MoreInformation";
import { ProductGallery } from "@/modules/product/product-gallery/ProductGallery";
import { ProductPricing } from "@/modules/product/product-pricing/ProductPricing";
import { ProductTopInfo } from "@/modules/product/ProductTopInfo";
import {
  BaseCartFragment,
  BaseProductFragment as BaseProductFragmentType,
  BaseStoreFragment,
  GetProductStockQuery,
} from "@/types";
import { formatGTMCategories } from "@/utils/gtm";
import { dateToNOFormat } from "@/utils/helpers";

interface Props {
  baseProductData: BaseProductFragmentType;
  configurationBlock?: React.ReactNode;
  productGallery?: React.ReactNode;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
}

export const BaseProductLayout: React.FC<Props> = ({
  baseProductData,
  configurationBlock,
  cart,
  stock,
  selectedStore,
}) => {
  const { activeProductVariant } = useActiveProductData();
  const searchParams = useSearchParams();
  const params = searchParams.entries();

  const product = activeProductVariant.variant?.product ?? baseProductData;
  const { data: productSliderData, isLoading: isSlidersDataLoading } =
    useProductSliderDataQuery(product.sku);

  const viewProductGTMEvent = React.useCallback(() => {
    if (!product) {
      return;
    }

    // Dont trigger second time when params change
    if (!!Object.keys(params).length) {
      return;
    }

    return sendGTMEvent({
      event: "view_item",
      currency: "NOK",
      value: product.price_range.maximum_price?.final_price?.value,
      items: [
        {
          item_id: product.sku,
          item_name: product.name,
          item_brand: product.productBrand?.name,
          price: product.price_range.maximum_price?.final_price.value,
          discount: product.price_range.maximum_price?.discount?.amount_off,
          ...formatGTMCategories(
            product.categories?.map((cat) => ({
              name: cat?.name,
            })),
          ),
        },
      ],
    });
  }, [params, product]);

  React.useEffect(() => {
    viewProductGTMEvent();
  }, [product, viewProductGTMEvent]);

  const isPastDate = (date: string) => {
    return new Date(date) < new Date();
  };

  const displayBadge =
    product.special_price &&
    product.campaign_period &&
    !isPastDate(product.campaign_period);

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

            <div className="flex flex-col gap-2">
              <ProductPricing product={product} />
              {displayBadge && product.campaign_period ? (
                <div className="block">
                  <span className="text-sm bg-powder rounded-2xl py-1 px-2">
                    Tilbudet gjelder t.o.m.{" "}
                    {dateToNOFormat(product.campaign_period)}
                  </span>
                </div>
              ) : null}
            </div>

            <MoreInTheStore />
            <PurchaseBlock
              selectedStore={selectedStore}
              stock={stock}
              cart={cart}
              product={product}
            />
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
