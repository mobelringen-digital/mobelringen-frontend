"use client";

import React from "react";

import cx from "classnames";

import { ProductMeasurementsSkeleton } from "@/modules/product/information-accordion/measurements/ProductMeasurementsSkeleton";
import { useProductMeasurementsQuery } from "@/modules/product/information-accordion/measurements/useProductMeasurementsQuery";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const ProductMeasurements: React.FC<Props> = ({ product }) => {
  const { data, isLoading } = useProductMeasurementsQuery(product.sku);

  const productMeasurements = React.useMemo(() => {
    const measurementFields = [
      {
        translation: "Høyde",
        value: data?.measurement_height,
      },
      {
        translation: "Bredde",
        value: data?.measurement_width,
      },
      {
        translation: "Lengde",
        value: data?.measurement_length,
      },
      {
        translation: "Sittehøyde",
        value: data?.measurement_seat_height,
      },
      {
        translation: "Dybde",
        value: data?.measurement_depth,
      },
      {
        translation: "Tykkelse",
        value: data?.measurement_thickness,
      },
      {
        translation: "Diameter",
        value: data?.measurement_diameter,
      },
      {
        translation: "Volum",
        value: data?.measurement_volume,
      },
      {
        translation: "Bruttovekt",
        value: data?.measurement_gross_weight,
      },
    ];

    return measurementFields.filter(
      (field) => !!field.value && field.value !== "0",
    );
  }, [data]);

  if (isLoading) {
    return <ProductMeasurementsSkeleton />;
  }

  return (
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
          <div className="font-semibold p-2 min-w-32">{field.translation}</div>
          <div className="p-2">{field.value}</div>
        </li>
      ))}
    </ul>
  );
};
