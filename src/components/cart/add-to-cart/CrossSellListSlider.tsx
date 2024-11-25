import React from "react";

import { useCookies } from "react-cookie";

import { useCrossSellQuery } from "@/components/cart/add-to-cart/useCrossellQuery";
import { ProductSlider } from "@/components/product-slider/ProductSlider";
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
  const { data: crossSellProducts } = useCrossSellQuery(
    product.id,
    cookies.preferredMethod,
    selectedStore?.external_id,
  );

  return (
    <>
      {crossSellProducts && crossSellProducts.length > 0 ? (
        <div className="flex flex-col mt-4">
          <ProductSlider
            cardHeight="small"
            nonSliderClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
            sliderConfig={{
              dots: false,
              variableWidth: true,
              adaptiveHeight: true,
              infinite: false,
              arrows: false,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ],
            }}
            hasAddToCart={true}
            title="Andre har også kjøpt"
            data={crossSellProducts}
          />
        </div>
      ) : null}
    </>
  );
};
