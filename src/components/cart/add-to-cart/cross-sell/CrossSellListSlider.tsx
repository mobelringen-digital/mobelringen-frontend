import React from "react";

import { useCookies } from "react-cookie";

import { CrossSellListItem } from "@/components/cart/add-to-cart/cross-sell/CrossSellListItem";
import { CrossSellListItemSkeleton } from "@/components/cart/add-to-cart/cross-sell/CrossSellListItemSkeleton";
import { useCrossSellQuery } from "@/components/cart/add-to-cart/useCrossellQuery";
import { BaseProductFragment, BaseStoreFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
  selectedStore?: BaseStoreFragment | null;
}

export const CrossSellListSlider: React.FC<Props> = ({
  product,
  selectedStore,
}) => {
  const [cookies] = useCookies();
  const { data: crossSellProducts, isLoading } = useCrossSellQuery(
    product.id,
    cookies.preferredMethod,
    selectedStore?.external_id,
  );

  return (
    <>
      {crossSellProducts && crossSellProducts.length > 0 ? (
        <>
          <h2 className="text-xl lg:text-3xl font-medium font-feature mt-8">
            Andre har også kjøpt
          </h2>
          {isLoading ? <CrossSellListItemSkeleton /> : null}

          {crossSellProducts.map((item) => {
            return <CrossSellListItem product={item} key={item?.sku} />;
          })}
        </>
      ) : null}
    </>
  );
};
