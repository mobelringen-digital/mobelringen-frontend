import React from "react";

import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";

import "yet-another-react-lightbox/styles.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    url: string | null | undefined;
    label: string | null | undefined;
  }>;
}

export const ProductLightbox: React.FC<Props> = ({
  images,
  isOpen,
  onClose,
}) => {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      plugins={[Zoom]}
      slides={images.map((img) => ({
        src: img.url ?? "",
        caption: img.label ?? "",
      }))}
    />
  );
};
