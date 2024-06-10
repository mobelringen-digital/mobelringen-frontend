import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PurchaseBlock } from "@/modules/product/add-to-cart/PurchaseBlock";
import { MoreInTheStore } from "@/modules/product/MoreInTheStore";
import { ProductGallery } from "@/modules/product/product-gallery/ProductGallery";
import { ProductPricing } from "@/modules/product/product-pricing/ProductPricing";
import { ProductTopInfo } from "@/modules/product/ProductTopInfo";
import { ProductsQuery } from "@/types";

interface Props {
  product: NonNullable<NonNullable<ProductsQuery["products"]>["items"]>[0];
}

export const ProductPage: React.FC<Props> = ({ product }) => {
  return (
    <ContainerLayout>
      {product?.categories ? (
        <Breadcrumbs
          data={product.categories
            .filter((c) => !c?.url_path?.includes("merker"))
            .map((cat) => ({
              label: cat?.name ?? "",
              url: `/c/${cat?.url_path}`,
            }))}
        />
      ) : null}

      <div className="grid grid-cols-12 gap-4 lg:gap-16">
        <div className="col-span-12 lg:col-span-7">
          <ProductGallery
            imageData={product?.image}
            // @ts-expect-error An issue with codegen an array of fragments
            galleryData={product?.media_gallery}
            labelData={product?.productLabel}
            priceRangeData={product?.price_range}
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <ProductTopInfo
            brand={product?.productBrand?.name}
            name={product?.name}
            shortDescription={product?.short_description?.html}
          />
          <ProductPricing priceRangeData={product?.price_range} />
          <MoreInTheStore />
          <PurchaseBlock />
        </div>
      </div>
      <Debugger data={product} />
    </ContainerLayout>
  );
};
