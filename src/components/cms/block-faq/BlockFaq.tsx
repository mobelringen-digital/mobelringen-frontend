import React from "react";

import { Accordion } from "@/components/_ui/accordion/Accordion";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
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
        <CmsBlockHeader title={data.title} />

        <Accordion data={accordionData} />
      </ContainerLayout>
    </CmsBlockWrapper>
  );
};
