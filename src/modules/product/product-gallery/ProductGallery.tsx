"use client";

import React from "react";

import { ProductImage } from "@/modules/product/product-gallery/ProductImage";
import { ProductImageSlider } from "@/modules/product/product-gallery/ProductImageSlider";
import { ProductLightbox } from "@/modules/product/product-gallery/ProductLightbox";
import {
  ProductImageFragment,
  ProductLabelFragment,
  ProductMediaGalleryFragment,
  ProductPriceRangeFragment,
} from "@/queries/product.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  imageData?: FragmentType<typeof ProductImageFragment> | null;
  galleryData?: Array<FragmentType<typeof ProductMediaGalleryFragment>> | null;
  labelData?: FragmentType<typeof ProductLabelFragment> | null;
  priceRangeData?: FragmentType<typeof ProductPriceRangeFragment> | null;
}

export const ProductGallery: React.FC<Props> = ({
  imageData,
  galleryData,
  labelData,
  priceRangeData,
}) => {
  const [photoIndex, setPhotoIndex] = React.useState<number | null>(null);

  const image = useFragment(ProductImageFragment, imageData);
  const gallery = useFragment(ProductMediaGalleryFragment, galleryData);
  const labels = useFragment(ProductLabelFragment, labelData);
  const priceRange = useFragment(ProductPriceRangeFragment, priceRangeData);

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
