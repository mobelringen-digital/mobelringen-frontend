import React from "react";

import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Debugger } from "@/components/Debugger";
import { CirclePlusIcon } from "@/components/icons/CirclePlusIcon";
import { LocalShippingIcon } from "@/components/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/icons/StorefrontIcon";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { StatusCircle } from "@/components/status-circle/StatusCircle";
import { ProductGallery } from "@/modules/product/product-gallery/ProductGallery";
import { ProductPricing } from "@/modules/product/product-pricing/ProductPricing";
import { ProductsQuery } from "@/types";
import { generateUrl } from "@/utils/helpers";

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
          {product?.productBrand?.name ? (
            <Link href={`/b/${generateUrl(product.productBrand.name)}`}>
              <h4 className="text-lg lg:text-xl text-dark-grey font-semibold">
                {product?.productBrand?.name}
              </h4>
            </Link>
          ) : null}

          <h1 className="mt-2 mb-4 font-medium text-4xl lg:text-5xl font-feature leading-[3.5rem]">
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
          <div className="mt-4">
            <ProductPricing priceRangeData={product?.price_range} />
          </div>
          <div className="mt-8 bg-warm-grey p-4 lg:p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg lg:text-xl font-semibold">
                Flere valgmuligheter i butikk
              </h4>
              <button>
                <CirclePlusIcon />
              </button>
            </div>

            <p className="text-sm lg:text-base font-normal">
              Visste du at vi hjelper deg å skreddersy produkter i butikk? Les
              mer om hvordan vi kan hjelpe deg i din butikk.
            </p>
          </div>
          <div className="mt-8 bg-white p-4 lg:p-8 rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold flex gap-2 text-base">
                  <LocalShippingIcon width={24} height={24} />
                  Nettbutikk
                </span>
                <div className="flex gap-2 mt-2">
                  <StatusCircle variant="green" className="mt-1 ml-1" />
                  <div className="flex flex-col">
                    <span>Tilgjengelig på nett</span>
                    <span className="text-sm text-dark-grey">
                      Estimert levering: 4-6 dager
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-semibold flex gap-2 text-base">
                  <StorefrontIcon width={24} height={24} />
                  Klikk og hent
                </span>
                <div className="flex gap-2 mt-2">
                  <StatusCircle variant="green" className="mt-1 ml-1" />
                  <div className="flex flex-col">
                    <span>Tilgjengelig på Lørenskog</span>
                    <span className="text-sm text-dark-grey">
                      Tilgjengelig i 13 butikker
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Debugger data={product} />
    </ContainerLayout>
  );
};
