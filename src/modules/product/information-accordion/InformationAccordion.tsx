"use client";

import React from "react";

import { Accordion } from "@/components/_ui/accordion/Accordion";
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
        <p dangerouslySetInnerHTML={{ __html: product.description.html }} />
      ),
    });
  }

  accordionData.push({
    title: "Mål",
    content: "...",
  });

  accordionData.push({
    title: `Kundeanmeldelser (${product.review_count})`,
    content: "...",
  });

  if (product?.maintenance_description) {
    accordionData.push({
      title: "Vedlikehold",
      content: (
        <p
          dangerouslySetInnerHTML={{ __html: product.maintenance_description }}
        />
      ),
    });
  }

  return <Accordion data={accordionData} />;
};
