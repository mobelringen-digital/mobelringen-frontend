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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

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
      {isOpen !== null ? (
        <ProductLightbox
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          images={images}
        />
      ) : null}
      {product.media_gallery && product.media_gallery.length > 0 ? (
        <ProductImageSlider
          product={product}
          setPhotoIndex={() => setIsOpen(true)}
        />
      ) : product.image?.url ? (
        <ProductImage product={product} onZoomClick={() => setIsOpen(true)} />
      ) : null}
    </>
  );
};
