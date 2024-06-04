import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { CmsLinkFragment } from "@/queries/menu.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  data: FragmentType<typeof CmsLinkFragment>;
  className?: string;
  afterIcon?: React.ReactNode;
  iconWidth?: number;
  iconHeight?: number;
}

export const CmsLink: React.FC<Props> = ({
  data,
  className,
  afterIcon,
  iconWidth = 24,
  iconHeight = 24,
}) => {
  const link = useFragment(CmsLinkFragment, data);

  return (
    <Link
      key={link.url}
      href={link.url}
      className={cx("flex items-center gap-1.5", className)}
    >
      <div className="flex gap-1.5 items-center">
        {link.icon?.url ? (
          <Image
            width={iconWidth}
            height={iconHeight}
            src={link.icon.url}
            alt={link.label}
            objectFit="cover"
            objectPosition="center"
          />
        ) : null}
        {link.label}
      </div>

      {afterIcon}
    </Link>
  );
};
