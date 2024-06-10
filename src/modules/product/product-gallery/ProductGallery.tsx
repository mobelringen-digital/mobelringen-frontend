"use client";

import React from "react";

import { ProductImage } from "@/modules/product/product-gallery/ProductImage";
import { ProductImageSlider } from "@/modules/product/product-gallery/ProductImageSlider";
import { ProductLightbox } from "@/modules/product/product-gallery/ProductLightbox";
import {
  ProductImageFragment,
  ProductMediaGalleryFragment,
} from "@/queries/product.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  imageData?: FragmentType<typeof ProductImageFragment> | null;
  galleryData?: Array<FragmentType<typeof ProductMediaGalleryFragment>> | null;
}

export const ProductGallery: React.FC<Props> = ({ imageData, galleryData }) => {
  const [photoIndex, setPhotoIndex] = React.useState<number | null>(null);

  const image = useFragment(ProductImageFragment, imageData);
  const gallery = useFragment(ProductMediaGalleryFragment, galleryData);

  React.useEffect(() => {
    if (photoIndex !== null) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [photoIndex]);

  const images = React.useMemo(() => {
    if (gallery && gallery.length > 0) {
      return gallery.map((img) => ({
        url: img?.url,
        label: img?.label,
      }));
    }

    return [
      {
        url: image?.url,
        label: image?.label,
      },
    ];
  }, [gallery, image?.label, image?.url]);

  return (
    <>
      {images && images.length > 0 ? (
        <>
          {photoIndex !== null ? (
            <ProductLightbox
              images={images}
              photoIndex={photoIndex}
              setPhotoIndex={setPhotoIndex}
            />
          ) : null}
          {gallery ? (
            <ProductImageSlider
              gallery={gallery}
              setPhotoIndex={setPhotoIndex}
            />
          ) : null}
        </>
      ) : image?.url ? (
        <ProductImage image={image} onZoomClick={() => setPhotoIndex(0)} />
      ) : null}
    </>
  );
};
