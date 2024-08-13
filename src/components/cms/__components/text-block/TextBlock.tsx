import React from "react";

import cx from "classnames";

import { CmsLink } from "@/components/cms/__components/link/CmsLink";
import { CmsTextBlockFragment, Position } from "@/types";

interface Props {
  data: CmsTextBlockFragment;
}

const TEXT_ALIGN: Record<Position, string> = {
  LEFT: "text-left",
  CENTER: "text-center",
  RIGHT: "text-right",
};

const BUTTON_JUSTIFY: Record<Position, string> = {
  LEFT: "justify-start",
  CENTER: "justify-center",
  RIGHT: "justify-end",
};

export const TextBlock: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col justify-center gap-8">
      {data.title ? (
        <h2
          className={cx(
            "text-4xl font-medium font-feature",
            TEXT_ALIGN[data.textAlign ?? "LEFT"],
          )}
        >
          {data.title}
        </h2>
      ) : null}
      {data.content?.html ? (
        <div
          className={cx("prose text-xl", TEXT_ALIGN[data.textAlign ?? "LEFT"])}
          dangerouslySetInnerHTML={{ __html: data.content.html }}
        />
      ) : null}
      {data.links ? (
        <div
          className={cx("flex gap-4", BUTTON_JUSTIFY[data.textAlign ?? "LEFT"])}
        >
          {data.links.map((link, idx) => (
            <CmsLink
              className={cx(
                "bg-powder text-black hover:bg-blend-darken hover:bg-powder-dark",
                "rounded-full py-4 px-6 lg:px-8 text-sm lg:text-base",
              )}
              link={link}
              key={idx}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
