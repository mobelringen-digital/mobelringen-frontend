import { useQuery } from "@tanstack/react-query";

import {
  ProductReviewsDocument,
  ProductReviewsQuery,
  ProductReviewsQueryVariables,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCT_REVIEWS_QUERY_KEY = ["product-reviews"];

export const fetchReviews = async (sku?: string | null) => {
  const data = await baseMagentoClient("GET").request<
    ProductReviewsQuery,
    ProductReviewsQueryVariables
  >(ProductReviewsDocument, {
    filter: {
      sku: {
        eq: sku,
      },
    },
  });

  return data.products?.items?.[0];
};

export const useProductReviewsQuery = (sku?: string | null) => {
  return useQuery({
    queryKey: [...PRODUCT_REVIEWS_QUERY_KEY, sku],
    queryFn: () => fetchReviews(sku),
    enabled: !!sku,
    staleTime: 3600,
  });
};
