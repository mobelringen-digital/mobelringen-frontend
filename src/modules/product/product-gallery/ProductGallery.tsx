"use client";

import React from "react";

import { ProductImage } from "@/modules/product/product-gallery/ProductImage";
import { ProductImageSlider } from "@/modules/product/product-gallery/ProductImageSlider";
import { ProductLightbox } from "@/modules/product/product-gallery/ProductLightbox";
import {
  ProductImageFragmentFragment,
  ProductLabelFragment,
  ProductMediaGalleryFragment,
  ProductPriceRangeFragment,
} from "@/types";

interface Props {
  image?: ProductImageFragmentFragment | null;
  gallery?: Array<ProductMediaGalleryFragment | null> | null;
  labels?: ProductLabelFragment | null;
  priceRange?: ProductPriceRangeFragment | null;
}

export const ProductGallery: React.FC<Props> = ({
  image,
  gallery,
  labels,
  priceRange,
}) => {
  const [photoIndex, setPhotoIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (photoIndex !== null) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [photoIndex]);

  const images = React.useMemo(() => {
    if (gallery && gallery.length > 0) {
      return gallery
        .filter((i) => i?.__typename !== "ProductVideo")
        .map((img) => ({
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
  }, [gallery, image]);

  return (
    <>
      {photoIndex !== null ? (
        <ProductLightbox
          images={images}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      ) : null}
      {gallery && gallery.length > 0 ? (
        <ProductImageSlider
          priceRange={priceRange}
          labels={labels}
          gallery={gallery}
          setPhotoIndex={setPhotoIndex}
        />
      ) : image?.url ? (
        <ProductImage
          labels={labels}
          priceRange={priceRange}
          image={image}
          onZoomClick={() => setPhotoIndex(0)}
        />
      ) : null}
    </>
  );
};
