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
  LEFT: "lg:justify-start",
  CENTER: "lg:justify-center",
  RIGHT: "lg:justify-end",
};

const isEmptyHTML = (html: string) => html === "<p></p>";

export const TextBlock: React.FC<Props> = ({ data }) => {
  return (
    <div
      id="cms-text-block"
      className="flex flex-col justify-center max-w-[950px] mx-auto gap-4 lg:gap-8"
    >
      {data.title && !isEmptyHTML(data.title.html) ? (
        <div
          className={cx(
            "text-3xl font-normal lg:text-4xl font-feature",
            TEXT_ALIGN[data.textAlign ?? "LEFT"],
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: data.title.html }} />
        </div>
      ) : null}
      {data.content?.html && !isEmptyHTML(data.content.html) ? (
        <div
          className={cx(
            "prose text-lg lg:text-xl font-normal",
            TEXT_ALIGN[data.textAlign ?? "LEFT"],
          )}
          dangerouslySetInnerHTML={{ __html: data.content.html }}
        />
      ) : null}
      {data.links ? (
        <div
          className={cx(
            "flex flex-wrap gap-4 justify-center",
            BUTTON_JUSTIFY[data.textAlign ?? "LEFT"],
          )}
        >
          {data.links.map((link, idx) => (
            <CmsLink
              className={cx(
                "bg-powder text-black hover:bg-blend-darken hover:bg-powder-dark",
                "rounded-full py-4 px-6 lg:px-8 text-sm lg:text-base !no-underline",
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
