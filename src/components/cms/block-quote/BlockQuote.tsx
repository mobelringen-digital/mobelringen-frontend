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
  const BlockQuoteComponent = ({ hasImage }: { hasImage: boolean }) => {
    return (
      <blockquote
        className={cx(
          {
            "absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-3/4 lg:mx-0 top-full -translate-y-1/4 mx-4":
              hasImage,
          },
          "bg-powder lg:w-[800px] p-6 lg:p-12 rounded-[56px] rounded-bl-none font-feature flex font-normal justify-center items-center flex-col gap-4",
        )}
      >
        <Quote />
        <p
          className="text-xl lg:text-3xl text-center mt-2"
          dangerouslySetInnerHTML={{
            __html: data.quote?.html ?? "",
          }}
        />
        <p className="text-center">- {data.author}</p>
      </blockquote>
    );
  };

  if (data.image?.url) {
    return (
      <CmsBlockWrapper>
        <div className="grid grid-cols-2">
          <div className="col-span-2 lg:col-span-1 relative">
            <Image
              width={data.image.width ?? 700}
              height={data.image.height ?? 700}
              src={data.image.url}
              alt={data.author ?? "quote"}
            />
            <BlockQuoteComponent hasImage={true} />
          </div>
          <div />
        </div>
      </CmsBlockWrapper>
    );
  }

  return (
    <CmsBlockWrapper>
      <div className="grid grid-cols-1 text-center">
        <div className="flex justify-center">
          <BlockQuoteComponent hasImage={false} />
        </div>
      </div>
    </CmsBlockWrapper>
  );
};
