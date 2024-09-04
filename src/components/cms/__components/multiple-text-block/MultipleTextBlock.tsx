import React from "react";

import { TextBlock } from "@/components/cms/__components/text-block/TextBlock";
import { CmsMultipleTextBlockFragment } from "@/types";

interface Props {
  data: CmsMultipleTextBlockFragment;
}

export const MultipleTextBlock: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col w-full">
      {data.paragraphs.map((paragraph, index) => (
        <TextBlock data={paragraph} key={index} />
      ))}
    </div>
  );
};
