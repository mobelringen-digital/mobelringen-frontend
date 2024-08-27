import React from "react";

import { Accordion } from "@/components/_ui/accordion/Accordion";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsBlockFaqFragment } from "@/types";

interface Props {
  data: CmsBlockFaqFragment;
}

export const BlockFaq: React.FC<Props> = ({ data }) => {
  const accordionData = data.questions.map((question) => ({
    title: question.question,
    content: (
      <div
        id="cms-text-block"
        dangerouslySetInnerHTML={{
          __html: question.answer?.html ?? "",
        }}
      />
    ),
  }));

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <ContainerLayout className="max-w-[950px]">
        <h2 className="text-4xl font-medium font-feature mb-8 lg:mb-12">
          {data.title}
        </h2>
        <Accordion data={accordionData} />
      </ContainerLayout>
    </CmsBlockWrapper>
  );
};
