"use client";

import React from "react";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockHtmlCodeFragment } from "@/types";

interface Props {
  data: CmsBlockHtmlCodeFragment;
}

export const BlockHTMLCode: React.FC<Props> = ({ data }) => {
  if (!data.markup) {
    return null;
  }

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <div id="cms-text-block" dangerouslySetInnerHTML={{ __html: data.markup }} />
    </CmsBlockWrapper>
  );
};
