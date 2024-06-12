import React from "react";

import { FavoriteIcon } from "@/components/_ui/icons/FavoriteIcon";
import { Label } from "@/components/_ui/label/Label";
import { ProductLabelFragment } from "@/types";

interface Props {
  discount?: string | null;
  labels?: ProductLabelFragment | null;
}

export const ProductLabels: React.FC<Props> = ({ discount, labels }) => {
  return (
    <>
      {discount ? (
        <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
          <Label variant="powder">{discount}</Label>
        </div>
      ) : null}
      <div className="absolute top-2 lg:top-4 left-2 lg:left-4 flex gap-1 items-center justify-center text-center">
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
      <div className="absolute bottom-2 right-2 lg:right-4 z-50">
        <button>
          <FavoriteIcon width={24} height={24} />
        </button>
      </div>
    </>
  );
};
