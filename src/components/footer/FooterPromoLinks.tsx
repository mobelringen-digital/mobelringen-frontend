import React from "react";

import Image from "next/image";

import { FooterIconLink } from "@/components/footer/FooterIconLink";
import { MenuQuery, MenuType } from "@/types";
import { ArrayElement } from "@/utils/ts-utils";

interface Props {
  data?: ArrayElement<MenuQuery["menus"]>;
}

export const FooterPromoLinks: React.FC<Props> = ({ data }) => {
  if (data?.menuLocation !== MenuType.FooterIconsMenu) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center my-4 lg:my-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 order-2 lg:order-1">
        {data.links.map((link, index) => (
          <React.Fragment key={index}>
            {link.__typename === "Link" ? <FooterIconLink data={link} /> : null}
          </React.Fragment>
        ))}
      </div>
      <div className="flex mb-8 lg:mb-0 justify-center lg:justify-end items-center order-1 lg:order-2">
        <Image src="/logo.svg" alt="logo" width={112} height={56} />
      </div>
    </div>
  );
};
