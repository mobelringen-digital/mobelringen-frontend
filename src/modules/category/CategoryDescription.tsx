import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";

interface Props {
  name: string;
  description: string;
}

export const CategoryDescription: React.FC<Props> = ({ name, description }) => {
  return (
    <div className="bg-warm-grey py-6 lg:py-12 mt-12">
      <ContainerLayout className="xl:max-w-[1200px]">
        <div className="bg-cream rounded-3xl p-6 lg:p-12">
          <div className="text-2xl font-medium mb-2">{name}</div>
          <div
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
