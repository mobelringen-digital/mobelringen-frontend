"use client";

import { useQuery } from "@tanstack/react-query";

import { getProductCrossSellDocument } from "@/queries/product/product.queries";
import { DeliveryType } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

const CROSS_SELL_QUERY_KEY = "crosssell";

const fetchCartService = async (
  productId?: number | null,
  delivery: DeliveryType = DeliveryType.Online,
  storeId?: string | null,
) => {
  if (!productId) {
    return;
  }

  const data = await baseMagentoClient("GET").request(
    getProductCrossSellDocument,
    {
      pos_id: storeId ?? "",
      product_id: productId,
      pos_type: delivery,
    },
  );

  return data.crossSellStockProducts;
};

export const useCrossSellQuery = (
  productId?: number | null,
  delivery: DeliveryType = DeliveryType.Online,
  storeId?: string | null,
) => {
  return useQuery({
    queryKey: [...CROSS_SELL_QUERY_KEY],
    queryFn: () => fetchCartService(productId, delivery, storeId),
  });
};
