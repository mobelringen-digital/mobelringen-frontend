import React from "react";

import Lightbox from "react-image-lightbox";

import { ProductMediaGalleryFragment } from "@/types";

import "react-image-lightbox/style.css";

interface Props {
  gallery: readonly ProductMediaGalleryFragment[];
  photoIndex: number;
  setPhotoIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onCloseRequest: () => void;
}

export const ProductLightbox: React.FC<Props> = ({
  gallery,
  photoIndex,
  setPhotoIndex,
  onCloseRequest,
}) => {
  return (
    <Lightbox
      mainSrc={gallery?.[photoIndex].url ?? ""}
      nextSrc={gallery?.[(photoIndex + 1) % gallery.length].url ?? ""}
      prevSrc={
        gallery?.[(photoIndex + gallery.length - 1) % gallery.length].url ?? ""
      }
      onCloseRequest={onCloseRequest}
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length)
      }
      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % gallery.length)}
    />
  );
};
