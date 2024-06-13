import React from "react";

import Image from "next/image";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { MenuQuery, MenuType } from "@/types";
import { ArrayElement } from "@/utils/ts-utils";

interface Props {
  data?: ArrayElement<MenuQuery["menus"]>;
}

export const FooterCopyright: React.FC<Props> = ({ data }) => {
  if (data?.menuLocation !== MenuType.FooterCopyrightMenu) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center mt-8 text-sm">
      <div className="flex gap-2 mb-8 lg:mb-0 text-xs lg:text-sm">
        <span className="mr-6">© Møbelringen 2024</span>
        {data.links.map((link, idx) => (
          <React.Fragment key={idx}>
            {link.__typename === "Link" ? (
              <CmsLink link={link} className="hover:underline" />
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Image src="/logo/visa.png" alt="visa" width={48} height={16} />
        <Image
          src="/logo/mastercard.png"
          alt="mastercard"
          width={48}
          height={16}
        />
        <Image src="/logo/vipps.png" alt="vipps" width={48} height={16} />
        <Image src="/logo/klarna.png" alt="klarna" width={48} height={16} />
      </div>
    </div>
  );
};
