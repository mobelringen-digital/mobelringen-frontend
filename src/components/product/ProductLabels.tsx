import React from "react";

import { FixedLowPriceIconSmall } from "@/components/_ui/icons/figma/FixedLowPriceIconSmall";
import { Label } from "@/components/_ui/label/Label";
import { ProductLabelFragment } from "@/types";

interface Props {
  discount?: string | null;
  labels?: ProductLabelFragment | null;
  addToWishList?: React.ReactNode;
  lowPrice?: boolean | null;
}

export const ProductLabels: React.FC<Props> = ({
  discount,
  labels,
  addToWishList,
  lowPrice,
}) => {
  return (
    <>
      <div className="absolute top-2 lg:top-4 right-2 lg:right-4 flex flex-col gap-1 items-end justify-center">
        {discount ? <Label variant="powder">{discount}</Label> : null}
        <>
          {labels?.custom ? (
            <>
              {labels.custom.map((label, idx) => (
                <Label variant="black" key={idx}>
                  {label}
                </Label>
              ))}
            </>
          ) : null}
        </>
      </div>
      <div className="absolute top-2 lg:top-4 left-0 sm:left-2 lg:left-4">
        {lowPrice ? <FixedLowPriceIconSmall /> : null}
      </div>
      <div className="absolute bottom-0 right-0 z-20">
        {addToWishList ? addToWishList : null}
      </div>
    </>
  );
};
