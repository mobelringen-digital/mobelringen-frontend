import { useQuery } from "@tanstack/react-query";

import { GetProductReviewsDocument } from "@/queries/product/product.queries";
import { baseMagentoClient } from "@/utils/lib/graphql";

export const PRODUCT_REVIEWS_QUERY_KEY = ["product-reviews"];

export const fetchReviews = async (productId?: string | null) => {
  if (!productId) return;

  const data = await baseMagentoClient("GET").request(
    GetProductReviewsDocument,
    {
      productId,
    },
  );

  return data.getReviewsByProductId;
};

export const useProductReviewsQuery = (productId?: string | null) => {
  return useQuery({
    queryKey: [...PRODUCT_REVIEWS_QUERY_KEY, productId],
    queryFn: () => fetchReviews(productId),
    enabled: !!productId,
    staleTime: 3600,
  });
};
