"use client";

import React from "react";

import { ProductImage } from "@/modules/product/product-gallery/ProductImage";
import { ProductImageSlider } from "@/modules/product/product-gallery/ProductImageSlider";
import { ProductLightbox } from "@/modules/product/product-gallery/ProductLightbox";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const ProductGallery: React.FC<Props> = ({ product }) => {
  const [photoIndex, setPhotoIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (photoIndex !== null) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [photoIndex]);

  const images = React.useMemo(() => {
    if (product.media_gallery && product.media_gallery.length > 0) {
      return product.media_gallery
        .filter((i) => i?.__typename !== "ProductVideo")
        .map((img) => ({
          url: img?.url,
          label: img?.label,
        }));
    }

    return [
      {
        url: product.image?.url,
        label: product.image?.label,
      },
    ];
  }, [product]);

  return (
    <>
      {photoIndex !== null ? (
        <ProductLightbox
          images={images}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      ) : null}
      {product.media_gallery && product.media_gallery.length > 0 ? (
        <ProductImageSlider product={product} setPhotoIndex={setPhotoIndex} />
      ) : product.image?.url ? (
        <ProductImage product={product} onZoomClick={() => setPhotoIndex(0)} />
      ) : null}
    </>
  );
};
