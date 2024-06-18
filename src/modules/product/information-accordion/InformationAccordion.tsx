"use client";

import React from "react";

import { Accordion } from "@/components/_ui/accordion/Accordion";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const InformationAccordion: React.FC<Props> = ({ product }) => {
  const accordionData = [];

  const productMeasurements = React.useMemo(() => {
    const measurementFields = [
      {
        translation: "Høyde",
        value: product.measurement_height,
      },
      {
        translation: "Bredde",
        value: product.measurement_width,
      },
      {
        translation: "Lengde",
        value: product.measurement_length,
      },
      {
        translation: "Sittehøyde",
        value: product.measurement_seat_height,
      },
      {
        translation: "Dybde",
        value: product.measurement_depth,
      },
      {
        translation: "Tykkelse",
        value: product.measurement_thickness,
      },
      {
        translation: "Diameter",
        value: product.measurement_diameter,
      },
      {
        translation: "Volum",
        value: product.measurement_volume,
      },
      {
        translation: "Bruttovekt",
        value: product.measurement_gross_weight,
      },
    ];

    return measurementFields.filter((field) => field.value);
  }, [product]);

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
    content: (
      <ul>
        {productMeasurements.map((field, idx) => (
          <li key={idx}>
            <span className="font-semibold">{field.translation}: </span>
            <span>{field.value}</span>
          </li>
        ))}
      </ul>
    ),
  });

  // @TODO: Move product reviews to client side request
  accordionData.push({
    title: `Kundeanmeldelser (${product.review_count})`,
    content: (
      <ul className="flex flex-col gap-4">
        {product.reviews?.items.map((review, idx) => (
          <li
            className="border-l-4 bg-warm-grey border-opacity-50 border-b-dark-grey p-4"
            key={idx}
          >
            <h3 className="text-lg font-semibold mb-1">{review?.nickname}</h3>
            <blockquote className="text-sm italic text-dark-grey">
              {review?.text}
            </blockquote>
          </li>
        ))}
      </ul>
    ),
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
