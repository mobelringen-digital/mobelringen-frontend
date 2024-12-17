import React from "react";

import cx from "classnames";

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
    <ul className="grid grid-cols-1 gap-2">
      {reviews?.reviews?.map((review, idx) => {
        const isLast = reviews?.reviews && idx === reviews?.reviews?.length - 1;

        return (
          <li
            className={cx(
              "flex flex-col gap-4 py-4 lg:py-6 border-b border-dark-grey border-opacity-30 pb-4",
              {
                "border-b-0": isLast,
              },
            )}
            key={idx}
          >
            <div className="flex justify-between items-center">
              {review?.score ? (
                <Stars rating={parseInt(review?.score)} />
              ) : null}
              <span className="text-sm font-light text-brown">
                {review?.created_at}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-brown font-feature">
                {review?.title}
              </h3>
              <blockquote className="text-sm text-brown">
                {review?.content}
              </blockquote>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-sm font-light text-brown">
                {review?.user?.display_name}
              </p>
              <div className="flex gap-1">
                <ReviewRating product={product} review={review} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
