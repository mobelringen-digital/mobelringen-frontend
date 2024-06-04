import React from "react";

import cx from "classnames";

import { FooterBlockLinks } from "@/components/footer/block-links/FooterBlockLinks";
import { FooterCopyright } from "@/components/footer/FooterCopyright";
import { FooterPromoLinks } from "@/components/footer/FooterPromoLinks";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";

export const Footer = () => {
  return (
    <footer className="bg-powder py-6 relative mt-[100px] lg:mt-[200px]">
      <div
        id="curved-corner"
        className={cx(
          "w-[90px] h-[90px] lg:w-[180px] lg:h-[180px] absolute overflow-hidden bottom-full right-0",
        )}
      />
      <ContainerLayout>
        <FooterPromoLinks />
        <FooterBlockLinks />
        <FooterCopyright />
      </ContainerLayout>
    </footer>
  );
};
