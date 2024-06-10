import React from "react";

import Link from "next/link";

interface Props {
  data: Array<{
    label: string;
    url: string;
  }>;
}

export const Breadcrumbs: React.FC<Props> = ({ data }) => {
  return (
    <ul className="flex list-none gap-2 mt-6 lg:mt-16 mb-6 lg:mb-12">
      <li>
        <Link className="text-grey text-xs lg:text-sm hover:underline" href="/">
          Hjem
        </Link>
      </li>
      <li>
        <span className="text-grey text-xs lg:text-sm">/</span>
      </li>
      {data.map((link, idx) => (
        <>
          <li key={idx}>
            <Link
              className="text-grey text-xs lg:text-sm hover:underline"
              href={link.url}
            >
              {link.label}
            </Link>
          </li>
          {idx !== data.length - 1 ? (
            <li>
              <span className="text-grey  text-xs lg:text-sm">/</span>
            </li>
          ) : null}
        </>
      ))}
    </ul>
  );
};
