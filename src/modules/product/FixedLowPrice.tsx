import React from "react";

import Link from "next/link";

import { FixedLowPriceIcon } from "@/components/_ui/icons/figma/FixedLowPriceIcon";
import { BaseProductFragment } from "@/types";

interface Props {
  product?: BaseProductFragment;
}

export const FixedLowPrice: React.FC<Props> = ({ product }) => {
  return (
    <>
      {product?.low_price ? (
        <Link href="/fast-lavpris" className="relative bg-pink rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="275"
            height="196"
            viewBox="0 0 275 196"
            fill="none"
          >
            <path
              d="M262.474 112.159C248.552 127.625 246.168 150.296 256.571 168.32C279.835 208.621 237.944 255.148 195.437 236.221C176.426 227.754 154.128 232.495 140.206 247.961C109.071 282.542 51.8768 257.076 56.7425 210.799C58.9159 190.101 47.5209 170.359 28.5099 161.893C-13.9976 142.965 -7.45491 80.6995 38.0579 71.0211C58.4106 66.6962 73.665 49.75 75.8429 29.0559C80.7086 -17.2253 141.945 -30.2402 165.209 10.0568C175.616 28.0809 196.438 37.3523 216.795 33.0275C262.308 23.3535 293.613 77.5733 262.478 112.154L262.474 112.159Z"
              fill="#FFEFE5"
            />
          </svg>
          <div className="p-8 absolute left-0 top-0 w-full flex flex-col gap-2">
            <FixedLowPriceIcon />
            <p className="font-feature text-md xl:text-xl font-normal">
              Fast lavpris er utvalgte møbler og modeller til faste, komfortable
              priser. Perfekt for deg som er opptatt av kvalitet, uten at det
              skal gå utover lommeboka.
            </p>
          </div>
        </Link>
      ) : null}
    </>
  );
};
