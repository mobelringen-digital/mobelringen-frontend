import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { ProductGallery } from "@/modules/product/product-gallery/ProductGallery";
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
          <h4 className="text-xl text-dark-grey font-semibold">
            {product?.productBrand?.name}
          </h4>
          <h1 className="mt-2 mb-4 font-medium text-5xl font-feature leading-[3.5rem]">
            {product?.name}
          </h1>
          {product?.short_description?.html ? (
            <p
              className="text-base font-normal text-black"
              dangerouslySetInnerHTML={{
                __html: product?.short_description.html,
              }}
            />
          ) : null}
        </div>
      </div>
      <Debugger data={product} />
    </ContainerLayout>
  );
};
