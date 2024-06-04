import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

interface Props {
  data: {
    __typename: "Link";
    label: string;
    url: string;
    icon?: { __typename?: "Asset" | undefined; url: string } | null | undefined;
  };
  className?: string;
}

export const CmsLink: React.FC<Props> = ({ data, className }) => {
  return (
    <Link
      key={data.url}
      href={data.url}
      className={cx("flex items-center gap-2", className)}
    >
      {data.icon?.url ? (
        <Image width={24} height={24} src={data.icon.url} alt={data.label} />
      ) : null}
      <span>{data.label}</span>
    </Link>
  );
};
