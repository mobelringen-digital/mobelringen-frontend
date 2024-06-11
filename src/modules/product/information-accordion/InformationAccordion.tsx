"use client";

import React from "react";

import { Accordion } from "@/components/_ui/accordion/Accordion";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const InformationAccordion: React.FC<Props> = ({ product }) => {
  return (
    <Accordion
      data={[
        {
          title: "Om produktet",
          content: (
            <p
              dangerouslySetInnerHTML={{
                __html: product?.description?.html ?? "",
              }}
            />
          ),
        },
        {
          title: "Mål",
          content: "...",
        },
        {
          title: "Kundeanmeldelser (4)",
          content: "...",
        },
        {
          title: "Delbetaling og levering",
          content: "...",
        },
      ]}
    />
  );
};
