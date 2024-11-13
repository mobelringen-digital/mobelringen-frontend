"use client";

import React from "react";

import cx from "classnames";
import Gallery, { RenderImageProps } from "react-photo-gallery";

import Image from "next/image";
import Link from "next/link";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsImagesGalleryFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  data: CmsImagesGalleryFragment;
}

interface ImageProps extends RenderImageProps {
  photo: {
    src: string;
    width: number;
    height: number;
    alt?: string;
    url?: string;
  };
}

export const CmsImageGallery: React.FC<Props> = ({ data }) => {
  const images = data.images
    .filter((i) => !!i.image)
    .map((imageData) => ({
      src: imageData.image.url,
      width: imageData.width ?? imageData.image.width ?? 250,
      height: imageData.height ?? imageData.image.height ?? 250,
      alt: imageData.label,
      url: isTypename(imageData, ["ImageLink"]) ? imageData.url : undefined,
    }));

  const imageRenderer = ({
    top,
    left,
    photo,
    direction,
    margin,
  }: ImageProps) => {
    if (photo.url) {
      return (
        <Link
          href={photo.url}
          className={cx("relative group", { absolute: direction === "column" })}
          style={{ top, left, margin }}
        >
          <div
            className={cx(
              "absolute left-0 right-0 top-0 bottom-0",
              "transition-all rounded-3xl bg-black opacity-0 group-hover:opacity-10 pointer-events-none",
            )}
          />
          <Image
            className="rounded-3xl"
            src={photo.src}
            alt={photo.alt ?? ""}
            width={photo.width}
            height={photo.height}
          />
        </Link>
      );
    }

    return (
      <Image
        className={cx("rounded-3xl", { absolute: direction === "column" })}
        style={{ top, left, margin }}
        src={photo.src}
        alt={photo.alt ?? ""}
        width={photo.width}
        height={photo.height}
      />
    );
  };

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      {!data.blockConfig?.hideBlockTitle ? (
        <h2 className="text-2xl lg:text-4xl font-medium font-feature mb-6 lg:mb-12">
          {data.title}
        </h2>
      ) : null}
      {data.description ? (
        <div
          className="text-black font-normal mb-6 lg:mb-12 lg:w-3/4"
          dangerouslySetInnerHTML={{
            __html: data.description.html ?? "",
          }}
        />
      ) : null}
      <div className="w-full">
        <Gallery
          renderImage={(props) => imageRenderer(props)}
          direction={data.imagesDirection ?? "row"}
          columns={data.columnsCount ?? 2}
          targetRowHeight={450}
          margin={12}
          photos={images}
        />
      </div>
    </CmsBlockWrapper>
  );
};
