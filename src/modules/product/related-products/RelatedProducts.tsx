import React from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { Debugger } from "@/components/Debugger";
import { ProductCard } from "@/components/product/ProductCard";
import { useRelatedProductsQuery } from "@/modules/product/related-products/useRelatedProductsQuery";

interface Props {
  sku?: string | null;
}

export const RelatedProducts: React.FC<Props> = ({ sku }) => {
  const { data, isLoading } = useRelatedProductsQuery(sku);

  if (!data?.length) return null;

  if (isLoading) {
    return (
      <LoaderInnerWrapper>
        <Loader />
      </LoaderInnerWrapper>
    );
  }

  return (
    <div className="my-28">
      <Debugger name={`Related products ${data.length}`} data={data} />
      <h2 className="text-2xl font-medium font-feature mb-4 lg:mb-8">
        Relaterte produkter
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
        {data?.map((product, idx) => (
          <div key={idx}>
            <ProductCard
              // @ts-expect-error codegen error with array
              productData={product}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
