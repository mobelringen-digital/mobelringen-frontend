import React from "react";

import StarRatings from "react-star-ratings";

interface Props {
  rating: number;
}

export const Stars: React.FC<Props> = ({ rating }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#3F1414"
      starEmptyColor="#E1DDDA"
      starDimension="20px"
      starSpacing="5px"
      numberOfStars={5}
      name="rating"
    />
  );
};
