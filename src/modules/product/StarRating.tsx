import React from "react";

import StarRatings from "react-star-ratings";

interface Props {
  rating: number;
  total?: number;
}

export const StarRating: React.FC<Props> = ({ rating, total }) => {
  return (
    <div className="flex items-center gap-4">
      <StarRatings
        rating={rating}
        starRatedColor="#3F1414"
        starEmptyColor="#E1DDDA"
        starDimension="20px"
        starSpacing="5px"
        numberOfStars={5}
        name="rating"
      />
      {total ? (
        <span
          aria-label={`${total} total reviews`}
          className="text-xs text-dark-grey"
        >
          ({total})
        </span>
      ) : null}
    </div>
  );
};
