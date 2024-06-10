import React from "react";

import Link from "next/link";

import { generateUrl } from "@/utils/helpers";

interface Props {
  brand?: string | null;
  name?: string | null;
  shortDescription?: string;
}

export const ProductTopInfo: React.FC<Props> = ({
  brand,
  name,
  shortDescription,
}) => {
  return (
    <>
      {brand ? (
        <Link href={`/b/${generateUrl(brand)}`}>
          <h4 className="text-lg lg:text-xl text-dark-grey font-semibold">
            {brand}
          </h4>
        </Link>
      ) : null}

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
    </>
  );
};
