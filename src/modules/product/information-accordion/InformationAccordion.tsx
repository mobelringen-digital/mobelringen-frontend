"use client";

import React from "react";

import { Accordion } from "@/components/_ui/accordion/Accordion";
import { ProductMeasurements } from "@/modules/product/information-accordion/measurements/ProductMeasurements";
import { ProductReviews } from "@/modules/product/information-accordion/reviews/ProductReviews";
import { useProductReviewsQuery } from "@/modules/product/information-accordion/reviews/useProductReviewsQuery";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const InformationAccordion: React.FC<Props> = ({ product }) => {
  const { data: reviews } = useProductReviewsQuery(String(product?.id));
  const accordionData = [];

  if (product?.description?.html) {
    accordionData.push({
      title: "Om produktet",
      content: (
        <div id="cms-text-block">
          <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
          <p className="text-dark-grey flex gap-1 mt-4">
            <span>Artikkelnr.</span>
            <span>{product.sku}</span>
          </p>
        </div>
      ),
    });
  }

  accordionData.push({
    title: "Mål",
    content: <ProductMeasurements product={product} />,
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

  accordionData.push({
    title: `Kundeanmeldelser (${reviews?.total_reviews ?? 0})`,
    content: <ProductReviews product={product} />,
  });

  return <Accordion data={accordionData} />;
};
