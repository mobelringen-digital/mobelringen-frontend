import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";

interface Props {
  children: React.ReactNode;
}

export const LoaderInnerWrapper: React.FC<Props> = ({ children }) => {
  return (
    <ContainerLayout className="flex justify-center items-center min-h-[30vh]">
      {children}
    </ContainerLayout>
  );
};
