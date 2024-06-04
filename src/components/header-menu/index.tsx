import React from "react";

import { Actions } from "@/components/header-menu/Actions";
import { DesktopMenu } from "@/components/header-menu/desktop-menu/DesktopMenu";
import { Logo } from "@/components/header-menu/Logo";
import { MobileMenu } from "@/components/header-menu/mobile-menu/MobileMenu";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { MenuQueryDocument } from "@/queries/menu.queries";
import { MenuQuery, MenuQueryVariables, MenuType } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

async function getMenu() {
  return await baseHygraphClient.request<MenuQuery, MenuQueryVariables>(
    MenuQueryDocument,
    {
      where: {
        menuLocation: MenuType.MainMenu,
      },
    },
  );
}

export async function HeaderMenu() {
  const data = await getMenu();

  return (
    <header className="shadow-header-menu backdrop-blur-lg sticky top-0 py-4 bg-white min-h-[80px] tracking-wide z-30 flex items-center">
      <ContainerLayout className="flex items-center justify-between">
        <DesktopMenu data={data} />
        <MobileMenu data={data} />
        <Logo />
        <Actions />
      </ContainerLayout>
    </header>
  );
}
