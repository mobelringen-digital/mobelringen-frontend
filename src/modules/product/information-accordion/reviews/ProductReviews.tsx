import React from "react";

import { Stars } from "@/components/_ui/Stars/Stars";
import { ReviewRating } from "@/modules/product/information-accordion/reviews/ReviewRating";
import { useProductReviewsQuery } from "@/modules/product/information-accordion/reviews/useProductReviewsQuery";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const ProductReviews: React.FC<Props> = ({ product }) => {
  const { data: reviews } = useProductReviewsQuery(String(product?.id));

  return (
    <ul className="grid grid-cols-1">
      {reviews?.reviews?.map((review, idx) => (
        <li
          className="bg-cream flex flex-col gap-4 p-4 lg:p-6 rounded-2xl"
          key={idx}
        >
          <div className="flex justify-between items-center">
            {review?.score ? <Stars rating={parseInt(review?.score)} /> : null}
            <span className="text-sm font-light text-brown">
              {review?.created_at}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-brown">
              {review?.title}
            </h3>
            <blockquote className="text-sm text-brown">
              {review?.content}
            </blockquote>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-light text-brown">
              {review?.user?.display_name}
            </p>
            <div className="flex gap-1">
              <ReviewRating review={review} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
