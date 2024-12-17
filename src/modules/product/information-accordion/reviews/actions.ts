"use server";

import { ReviewType, VoteForReviewDocument } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function voteForReview({
  productId,
  reviewId,
  type,
}: {
  productId: string;
  reviewId: string;
  type: ReviewType;
}) {
  const data = await baseMagentoClient("POST").request(VoteForReviewDocument, {
    productId,
    reviewId,
    type,
  });

  return data.voteForReview;
}
