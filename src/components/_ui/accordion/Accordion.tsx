"use client";

import React from "react";

import {
  Accordion as NextUIAccordion,
  AccordionItem,
} from "@nextui-org/accordion";

import { MinusIcon } from "@/components/_ui/icons/MinusIcon";
import { PlusIcon } from "@/components/_ui/icons/PlusIcon";

interface Props {
  data: Array<{
    title: string;
    content: React.ReactNode;
  }>;
}

export const Accordion: React.FC<Props> = ({ data }) => {
  return (
    <NextUIAccordion
      defaultExpandedKeys={["0"]}
      className="border-t-1 border-b-1 px-0 border-dark-grey border-opacity-30"
    >
      {data.map((item, idx) => (
        <AccordionItem
          indicator={({ isOpen }) =>
            isOpen ? <MinusIcon className="rotate-90" /> : <PlusIcon />
          }
          className="py-2 text-lg lg:text-xl font-normal"
          title={item.title}
          key={idx}
        >
          <div className="text-sm lg:text-base font-normal">{item.content}</div>
        </AccordionItem>
      ))}
    </NextUIAccordion>
  );
};
