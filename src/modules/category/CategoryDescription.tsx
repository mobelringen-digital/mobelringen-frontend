import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";

interface Props {
  name: string;
  description: string;
}

export const CategoryDescription: React.FC<Props> = ({ name, description }) => {
  return (
    <div className="bg-warm-grey py-0 lg:py-12 mt-12 w-full">
      <ContainerLayout className="!px-0 !lg:px-6 xl:max-w-[1200px]">
        <div className="bg-cream lg:rounded-3xl p-6 lg:p-12">
          <h1 className="text-4xl lg:text-5xl font-medium mb-4">{name}</h1>
          <div
            id="cms-text-block"
            className="text-lg lg:text-xl font-normal"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
      </ContainerLayout>
    </div>
  );
};
