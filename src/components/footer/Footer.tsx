import React from "react";

import cx from "classnames";

import { FooterBlockLinks } from "@/components/footer/block-links/FooterBlockLinks";
import { FooterCopyright } from "@/components/footer/FooterCopyright";
import { FooterPromoLinks } from "@/components/footer/FooterPromoLinks";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { MenuQueryDocument } from "@/queries/menu.queries";
import { MenuQuery, MenuType } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

async function getFooterMenus() {
  return await baseHygraphClient("GET").request<MenuQuery>(MenuQueryDocument, {
    where: {
      menuLocation_in: [
        MenuType.FooterMenu,
        MenuType.FooterCopyrightMenu,
        MenuType.FooterIconsMenu,
      ],
    },
  });
}

export async function Footer() {
  const data = await getFooterMenus();

  const footerBlocks = data.menus.find(
    (menu) => menu.menuLocation === MenuType.FooterMenu,
  );
  const copyRightLinks = data.menus.find(
    (menu) => menu.menuLocation === MenuType.FooterCopyrightMenu,
  );
  const promoLinks = data.menus.find(
    (menu) => menu.menuLocation === MenuType.FooterIconsMenu,
  );

  return (
    <footer className="bg-powder py-6 relative">
      <div
        id="curved-corner"
        className={cx(
          "w-[90px] h-[90px] lg:w-[180px] lg:h-[180px] absolute overflow-hidden bottom-full right-0",
        )}
      />
      <ContainerLayout>
        <FooterPromoLinks data={promoLinks} />
        <FooterBlockLinks data={footerBlocks} />
        <FooterCopyright data={copyRightLinks} />
      </ContainerLayout>
    </footer>
  );
}
