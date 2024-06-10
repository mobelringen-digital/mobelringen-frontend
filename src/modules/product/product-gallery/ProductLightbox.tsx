import React from "react";

import Lightbox from "react-image-lightbox";

import "react-image-lightbox/style.css";

interface Props {
  images: Array<{
    url: string | null | undefined;
    label: string | null | undefined;
  }>;
  photoIndex: number;
  setPhotoIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ProductLightbox: React.FC<Props> = ({
  images,
  photoIndex,
  setPhotoIndex,
}) => {
  return (
    <Lightbox
      mainSrc={images?.[photoIndex].url ?? ""}
      nextSrc={images?.[(photoIndex + 1) % images.length].url ?? ""}
      prevSrc={
        images?.[(photoIndex + images.length - 1) % images.length].url ?? ""
      }
      onCloseRequest={() => setPhotoIndex(null)}
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + images.length - 1) % images.length)
      }
      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
    />
  );
};
