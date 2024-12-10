"use server";

import { revalidateTag } from "next/cache";

import { ReviewType, VoteForReviewDocument } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function voteForReview({
  reviewId,
  type,
}: {
  reviewId: string;
  type: ReviewType;
}) {
  const data = await baseMagentoClient("POST").request(VoteForReviewDocument, {
    reviewId,
    type,
  });

  revalidateTag("reviews");

  return data.voteForReview;
}
