import React from "react";

import cx from "classnames";

import Image from "next/image";

import { Quote } from "@/components/_ui/icons/figma/Quote";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockQuoteFragment } from "@/types";

interface Props {
  data: CmsBlockQuoteFragment;
}

export const BlockQuote: React.FC<Props> = ({ data }) => {
  const BlockQuoteComponent = () => {
    return (
      <blockquote
        className={cx(
          "bg-powder mx-4 lg:mx-0 lg:w-[800px] p-6 lg:p-12 rounded-[56px] rounded-bl-none font-feature flex font-normal justify-center items-center flex-col gap-4",
        )}
      >
        <Quote />
        <div
          className="text-xl lg:text-3xl text-center mt-2"
          dangerouslySetInnerHTML={{
            __html: data.quote?.html ?? "",
          }}
        />
        {data.author ? <p className="text-center">{data.author}</p> : null}
      </blockquote>
    );
  };

  if (data.image?.url) {
    return (
      <CmsBlockWrapper config={data.blockConfig}>
        <div className="grid grid-cols-2 items-center">
          <div className="col-span-2 lg:col-span-1 relative">
            <Image
              className="rounded-3xl"
              width={data.image.width ?? 700}
              height={data.image.height ?? 700}
              src={data.image.url}
              alt={data.author ?? "quote"}
            />
          </div>
          <div className="col-span-2 lg:max-h-full lg:col-span-1 -translate-y-1/4 lg:translate-y-0 lg:-translate-x-1/4">
            <BlockQuoteComponent />
          </div>
        </div>
      </CmsBlockWrapper>
    );
  }

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <div className="grid grid-cols-1 text-center">
        <div className="flex justify-center">
          <BlockQuoteComponent />
        </div>
      </div>
    </CmsBlockWrapper>
  );
};
