import { useQuery } from "@tanstack/react-query";

import { ProductRelatedProductsDocument } from "@/queries/product.queries";
import { RelatedProductsQuery, RelatedProductsQueryVariables } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const RELATED_PRODUCTS_QUERY_KEY = ["related-products"];

export const useRelatedProductsQuery = (sku?: string | null) => {
  const fetchRelatedProducts = async () => {
    const data = await baseMagentoClient.request<
      RelatedProductsQuery,
      RelatedProductsQueryVariables
    >(ProductRelatedProductsDocument, {
      filter: {
        sku: {
          eq: sku,
        },
      },
    });

    return data.products?.items?.[0]?.related_products;
  };

  return useQuery({
    queryKey: [...RELATED_PRODUCTS_QUERY_KEY, sku],
    queryFn: fetchRelatedProducts,
    enabled: !!sku,
    staleTime: 3600,
  });
};
