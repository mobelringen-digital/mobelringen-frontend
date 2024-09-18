import React from "react";

import { BaseProductDataForCardFragment } from "@/types";

interface Props {
  children: React.ReactNode;
  categoryName: string | null | undefined;
  onItemClick?: (product: BaseProductDataForCardFragment) => void;
}

export const CategoryEvents: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};
