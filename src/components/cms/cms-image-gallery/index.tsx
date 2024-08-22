"use client";

import React from "react";

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
  const images = data.images.map((image) => ({
    src: image.image.url,
    width: image.image.width ?? 250,
    height: image.image.height ?? 250,
    alt: image.label,
    url: isTypename(image, ["ImageLink"]) ? image.url : undefined,
  }));

  const imageRenderer = ({ top, left, photo }: ImageProps) => {
    if (photo.url) {
      return (
        <Link href={photo.url} className="absolute" style={{ top, left }}>
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
        className="absolute rounded-3xl"
        style={{ top, left }}
        src={photo.src}
        alt={photo.alt ?? ""}
        width={photo.width}
        height={photo.height}
      />
    );
  };

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <h2 className="text-2xl lg:text-4xl font-medium font-feature mb-6 lg:mb-12">
        {data.title}
      </h2>
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
          direction="column"
          columns={3}
          margin={12}
          photos={images}
        />
      </div>
    </CmsBlockWrapper>
  );
};
