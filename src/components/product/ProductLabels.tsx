import React from "react";

import { Label } from "@/components/_ui/label/Label";
import { ProductLabelFragment } from "@/types";

interface Props {
  discount?: string | null;
  labels?: ProductLabelFragment | null;
  addToWishList?: React.ReactNode;
}

export const ProductLabels: React.FC<Props> = ({
  discount,
  labels,
  addToWishList,
}) => {
  return (
    <>
      {discount ? (
        <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
          <Label variant="powder">{discount}</Label>
        </div>
      ) : null}
      <div className="absolute top-2 lg:top-4 left-2 lg:left-4 flex flex-col gap-1 items-center justify-center text-center">
        {labels?.custom ? (
          <>
            {labels.custom.map((label, idx) => (
              <Label variant="black" key={idx}>
                {label}
              </Label>
            ))}
          </>
        ) : null}
      </div>
      <div className="absolute bottom-0 right-0 z-20">
        {addToWishList ? addToWishList : null}
      </div>
    </>
  );
};
