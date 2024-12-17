import React from "react";

import Link from "next/link";

import { StarRating } from "@/modules/product/StarRating";
import { ProductReviewsFragment } from "@/types";
import { generateUrl } from "@/utils/helpers";

interface Props {
  brand?: string | null;
  name?: string | null;
  shortDescription?: string;
  reviews?: ProductReviewsFragment | null;
}

export const ProductTopInfo: React.FC<Props> = ({
  brand,
  name,
  shortDescription,
  reviews,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        {brand ? (
          <Link aria-label={brand} href={`/merker/${generateUrl(brand)}`}>
            <h4 className="text-lg lg:text-xl text-dark-grey font-semibold">
              {brand}
            </h4>
          </Link>
        ) : null}
        {reviews?.total_rating ? (
          <StarRating
            rating={reviews?.total_rating ?? 0}
            total={reviews?.total_reviews ?? 0}
          />
        ) : null}
      </div>

      <h1 className="mt-2 mb-4 font-medium text-4xl lg:text-5xl font-feature leading-[3.5rem]">
        {name}
      </h1>
      {shortDescription ? (
        <p
          className="text-base font-normal text-black"
          dangerouslySetInnerHTML={{
            __html: shortDescription,
          }}
        />
      ) : null}
    </div>
  );
};
