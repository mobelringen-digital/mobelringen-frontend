import React from "react";

import { CmsImage } from "@/components/cms/__components/image/CmsImage";
import { ImageLink } from "@/components/cms/__components/image-link/ImageLink";
import { MultipleTextBlock } from "@/components/cms/__components/multiple-text-block/MultipleTextBlock";
import { TextBlock } from "@/components/cms/__components/text-block/TextBlock";
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

    case "Image":
      return <CmsImage data={column.content} />;

    case "MultipleTextBlock":
      return <MultipleTextBlock data={column.content} />;

    default:
      return null;
  }
};
