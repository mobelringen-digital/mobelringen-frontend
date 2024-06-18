"use client";

import React from "react";

import cx from "classnames";

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

    return measurementFields.filter(
      (field) => !!field.value && field.value !== "0",
    );
  }, [product]);

  if (product?.description?.html) {
    accordionData.push({
      title: "Om produktet",
      content: (
        <p dangerouslySetInnerHTML={{ __html: product.description.html }} />
      ),
    });
  }

  if (productMeasurements.length > 0) {
    accordionData.push({
      title: "Mål",
      content: (
        <ul>
          {productMeasurements.map((field, idx) => (
            <li
              className={cx(
                "flex hover:bg-warm-grey border-cold-grey-dark border-opacity-80 border-b p-2",
                {
                  "border-b-0": idx === productMeasurements.length - 1,
                },
              )}
              key={idx}
            >
              <div className="font-semibold p-2 min-w-32">
                {field.translation}
              </div>
              <div className="p-2">{field.value}</div>
            </li>
          ))}
        </ul>
      ),
    });
  }

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
