import React from "react";

import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { PRODUCT_STOCK_STATUS_COLOR } from "@/modules/product/add-to-cart/DeliveryInfo";
import { BaseProductDataForCardFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  product: BaseProductDataForCardFragment;
}

export const ProductStock: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 px-2">
      {isTypename(product, ["ConfigurableProduct", "SimpleProduct"]) ? (
        <>
          {product.stocks?.online?.stock_info ? (
            <div className="flex items-center gap-2">
              <StatusCircle
                size="small"
                variant={
                  PRODUCT_STOCK_STATUS_COLOR[
                    product.stocks?.online?.availability ?? "OUT_OF_STOCK"
                  ]
                }
              />
              <span className="text-xs">
                {product.stocks?.online?.stock_info ?? ""}
              </span>
            </div>
          ) : null}
        </>
      ) : null}

      {isTypename(product, ["ConfigurableProduct", "SimpleProduct"]) ? (
        <>
          {product.stocks?.cac?.stock_info ? (
            <div className="flex items-center gap-2">
              <StatusCircle
                size="small"
                variant={
                  PRODUCT_STOCK_STATUS_COLOR[
                    product.stocks?.cac?.availability ?? "OUT_OF_STOCK"
                  ]
                }
              />
              <span className="text-xs">
                {product.stocks?.cac?.stock_info ?? ""}
              </span>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};
