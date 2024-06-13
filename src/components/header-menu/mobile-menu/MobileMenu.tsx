import React, { Suspense } from "react";

import MobileMenuAdditionalLinks from "@/components/header-menu/mobile-menu/additional-links/MobileMenuAdditionalLinks";
import { MobileMenuBottomLinks } from "@/components/header-menu/mobile-menu/MobileMenuBottomLinks";
import { MobileMenuLinks } from "@/components/header-menu/mobile-menu/MobileMenuLinks";
import { MobileMenuProvider } from "@/components/header-menu/mobile-menu/MobileMenuProvider";
import { MenuQuery } from "@/types";

interface Props {
  data: MenuQuery;
}

export const MobileMenu: React.FC<Props> = ({ data }) => {
  return (
    <Suspense>
      <MobileMenuProvider>
        <MobileMenuLinks data={data} />
        <MobileMenuAdditionalLinks />
        <MobileMenuBottomLinks />
      </MobileMenuProvider>
    </Suspense>
  );
};
