import { useQuery } from "@tanstack/react-query";

import { ProductsQueryDocument } from "@/queries/product/product.queries";
import {
  BaseProductFragment,
  ProductsQuery,
  ProductsQueryVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const useProductQuery = (sku: string) => {
  const fetchProduct = async () => {
    const data = await baseMagentoClient("GET").request<
      ProductsQuery,
      ProductsQueryVariables
    >(ProductsQueryDocument, {
      filter: { sku: { eq: sku } },
      sort: {},
      currentPage: 1,
    });

    return data.products?.items?.[
      data.products?.items?.length - 1
    ] as BaseProductFragment;
  };

  return useQuery({
    queryKey: ["product", "hotspot", sku],
    queryFn: fetchProduct,
    enabled: !!sku,
  });
};
