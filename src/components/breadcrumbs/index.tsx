import React from "react";

import cx from "classnames";

import Link from "next/link";

interface Props {
  data: Array<{
    label: string;
    url: string;
  }>;
  className?: string;
}

export const Breadcrumbs: React.FC<Props> = ({
  data,
  className = "mt-6 lg:mt-16 mb-6 lg:mb-12",
}) => {
  return (
    <ul className={cx("flex flex-wrap list-none gap-2", className)}>
      <li>
        <Link
          className={cx(
            "text-grey text-xs lg:text-sm hover:underline",
            "after:content-['/'] after:text-grey after:text-xs after:lg:text-sm after:ml-2 after:hover:no-underline",
          )}
          href="/"
        >
          Hjem
        </Link>
      </li>
      {data.map((link, idx) => (
        <React.Fragment key={idx}>
          <li>
            <Link
              className={cx(
                "text-grey text-xs lg:text-sm hover:underline capitalize",
                {
                  "after:content-['/'] after:text-grey after:text-xs after:lg:text-sm after:ml-2 after:hover:no-underline":
                    idx !== data.length - 1,
                },
              )}
              href={link.url}
            >
              {link.label}
            </Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};
