"use client";

import React from "react";

import { Accordion } from "@/components/_ui/accordion/Accordion";
import { ProductMeasurements } from "@/modules/product/information-accordion/measurements/ProductMeasurements";
import { ProductReviews } from "@/modules/product/information-accordion/reviews/ProductReviews";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const InformationAccordion: React.FC<Props> = ({ product }) => {
  const accordionData = [];

  if (product?.description?.html) {
    accordionData.push({
      title: "Om produktet",
      content: (
        <>
          <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
          <p className="text-dark-grey flex gap-1 mt-4">
            <span>Artikkelnr.</span>
            <span>{product.sku}</span>
          </p>
        </>
      ),
    });
  }

  accordionData.push({
    title: "Mål",
    content: <ProductMeasurements product={product} />,
  });

  accordionData.push({
    title: `Kundeanmeldelser (${product.review_count})`,
    content: <ProductReviews product={product} />,
  });

  if (product?.maintenance_description) {
    accordionData.push({
      title: "Vedlikehold",
      content: (
        <div
          dangerouslySetInnerHTML={{ __html: product.maintenance_description }}
        />
      ),
    });
  }

  return <Accordion data={accordionData} />;
};
