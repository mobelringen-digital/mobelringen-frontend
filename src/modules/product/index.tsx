import React from "react";

import { AddToCart } from "@/components/cart/add-to-cart/AddToCart";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { ProductImage } from "@/modules/product/ProductImage";
import { ProductsQuery } from "@/types";

interface Props {
  product: NonNullable<NonNullable<ProductsQuery["products"]>["items"]>[0];
}

export const ProductPage: React.FC<Props> = ({ product }) => {
  return (
    <ContainerLayout>
      <AddToCart />
      <div className="grid grid-cols-12 gap-4 lg:gap-16">
        <div className="col-span-12 lg:col-span-7">
          {product?.image ? <ProductImage data={product?.image} /> : null}
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
