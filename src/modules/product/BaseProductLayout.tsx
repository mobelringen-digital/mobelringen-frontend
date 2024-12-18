"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { usePathname, useSearchParams } from "next/navigation";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { useProductSliderDataQuery } from "@/components/product/hooks/useProductSliderDataQuery";
import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { useActiveProductData } from "@/modules/product/active-product-data-provider/useActiveProductData";
import { PurchaseBlock } from "@/modules/product/add-to-cart/PurchaseBlock";
import { FixedLowPrice } from "@/modules/product/FixedLowPrice";
import { InformationAccordion } from "@/modules/product/information-accordion/InformationAccordion";
import { useProductReviewsQuery } from "@/modules/product/information-accordion/reviews/useProductReviewsQuery";
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
import { buildPathArray, dateToNOFormat } from "@/utils/helpers";

interface Props {
  baseProductData: BaseProductFragmentType;
  configurationBlock?: React.ReactNode;
  productGallery?: React.ReactNode;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
}

const viewProductGTMEvent = (
  product: BaseProductFragmentType,
  stock?: GetProductStockQuery,
) => {
  if (!product) {
    return;
  }

  sendGTMEvent({ ecommerce: null });
  return sendGTMEvent({
    event: "view_item",
    ecommerce: {
      currency: "NOK",
      value: product.price_range.maximum_price?.final_price?.value,
      addable_to_cart: product.addable_to_cart,
      stock_status: stock?.getProductStock,
      discount: product.price_range.maximum_price?.discount?.amount_off,
      label: product.productLabel,
      items: [
        {
          item_id: product.sku,
          item_name: product.name,
          addable_to_cart: product.addable_to_cart,
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
    },
  });
};

export const BaseProductLayout: React.FC<Props> = ({
  baseProductData,
  configurationBlock,
  cart,
  stock,
  selectedStore,
}) => {
  const { data: reviews } = useProductReviewsQuery(String(baseProductData?.id));
  const { activeProductVariant } = useActiveProductData();
  const searchParams = useSearchParams();
  const params = searchParams.entries();
  const pathname = usePathname();

  const product = activeProductVariant.variant?.product ?? baseProductData;
  const { data: productSliderData, isLoading: isSlidersDataLoading } =
    useProductSliderDataQuery(product.sku);

  React.useEffect(() => {
    // Dont trigger second time when params change
    if (!!Object.keys(params).length) {
      return;
    }

    viewProductGTMEvent(product, stock);
  }, [params, product, stock]);

  const isPastDate = (date: string) => {
    return new Date(date) < new Date();
  };

  const displayBadge =
    product.special_price &&
    product.campaign_period &&
    !isPastDate(product.campaign_period);

  const breadcrumbs = () => {
    const breadCrumbData = buildPathArray(pathname);

    const lastItem = breadCrumbData[breadCrumbData.length - 1];
    lastItem.label.split(" ");
    //remove last item from lastItem because its always ID
    lastItem.label = lastItem.label.replace(/[^ ]*$/, "");
    return breadCrumbData;
  };

  return (
    <>
      <ContainerLayout>
        <Breadcrumbs
          data={breadcrumbs().map((item) => ({
            url: item.value,
            label: item.label,
          }))}
        />

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
              reviews={reviews}
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
            <FixedLowPrice product={product} />

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
