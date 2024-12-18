import React from "react";

import { Stars } from "@/components/_ui/Stars/Stars";

interface Props {
  rating: number;
  total?: number;
}

export const StarRating: React.FC<Props> = ({ rating, total }) => {
  return (
    <div className="flex items-center gap-4">
      <Stars rating={rating} />
      {total ? (
        <span
          aria-label={`${total} total reviews`}
          className="text-md text-dark-grey mt-0.5"
        >
          ({total})
        </span>
      ) : null}
    </div>
  );
};
