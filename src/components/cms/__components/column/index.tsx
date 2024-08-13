import React from "react";

import { ImageLink } from "@/components/cms/__components/image-link";
import { TextBlock } from "@/components/cms/__components/text-block";
import { CmsColumnFragment } from "@/types";

interface Props {
  column: CmsColumnFragment;
}
export const Column: React.FC<Props> = ({ column }) => {
  switch (column.content?.__typename) {
    case "TextBlock":
      return <TextBlock data={column.content} />;

    case "ImageLink":
      return <ImageLink data={column.content} />;

    default:
      return null;
  }
};
