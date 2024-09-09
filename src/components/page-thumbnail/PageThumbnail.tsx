import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { CmsPageNodeFragment } from "@/types";

interface Props {
  page: CmsPageNodeFragment;
}

export const PageThumbnail: React.FC<Props> = ({ page }) => {
  const formatStringToReadableDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-2" key={page.id}>
      <Link href={page.url} className="relative group">
        <div
          className={cx(
            "absolute left-0 right-0 top-0 bottom-0",
            "transition-all rounded-3xl bg-black opacity-0 group-hover:opacity-10 pointer-events-none",
          )}
        />
        {page.pageThumbnail?.url ? (
          <Image
            className="rounded-3xl h-[250px] lg:h-[350px] object-cover"
            src={page.pageThumbnail?.url}
            alt={page.title}
            width={page.pageThumbnail.width ?? 420}
            height={page.pageThumbnail.height ?? 350}
          />
        ) : (
          <div className="h-[250px] lg:h-[350px] bg-white rounded-3xl flex justify-center items-center">
            <span className="text-black text-2xl font-bold">No Image</span>
          </div>
        )}
      </Link>
      <div className="flex mt-2 gap-4 text-sm lg:text-base text-dark-grey">
        {page.pageCategory.map((category, idx) => (
          <Link href={category.categoryUrl ?? ""} key={idx}>
            <span>{category.name}</span>
          </Link>
        ))}
        {page.pageCategory.length > 0 ? <span>|</span> : ""}
        {formatStringToReadableDate(page.createdAt)}
      </div>
      <h3 className="font-feature text-xl lg:text-3xl font-light">
        {page.title}
      </h3>
    </div>
  );
};
