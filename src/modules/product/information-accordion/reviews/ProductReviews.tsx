import React from "react";

import { useProductReviewsQuery } from "@/modules/product/information-accordion/reviews/useProductReviewsQuery";
import { BaseProductFragment, ProductReviewsFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
  reviews?: ProductReviewsFragment | null;
}

export const ProductReviews: React.FC<Props> = ({ product }) => {
  const { data } = useProductReviewsQuery(product.sku);

  return (
    <ul className="flex flex-col gap-4">
      {data?.reviews?.items.map((review, idx) => (
        <li
          className="border-l-4 bg-warm-grey border-opacity-50 border-b-dark-grey p-4"
          key={idx}
        >
          <h3 className="text-lg font-semibold mb-1">{review?.nickname}</h3>
          <blockquote className="text-sm italic text-dark-grey">
            {review?.text}
          </blockquote>
        </li>
      ))}
    </ul>
  );
};
