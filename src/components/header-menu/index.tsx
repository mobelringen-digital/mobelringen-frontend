import React from "react";

import { Actions } from "@/components/header-menu/Actions";
import { DesktopMenuAdditionalLinks } from "@/components/header-menu/desktop-menu/additional-links/DesktopMenuAdditionalLinks";
import { DesktopMenu } from "@/components/header-menu/desktop-menu/DesktopMenu";
import { Logo } from "@/components/header-menu/Logo";
import { MobileMenu } from "@/components/header-menu/mobile-menu/MobileMenu";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { NotificationBar } from "@/components/notification-bar/NotificationBar";
import { MenuQueryDocument } from "@/queries/menu.queries";
import {
  MenuQuery,
  MenuQueryVariables,
  MenuType,
  NotificationBarPosition,
} from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

import { getNotificationBars } from "../../app/actions";

async function getMenu() {
  return await baseHygraphClient("GET").request<MenuQuery, MenuQueryVariables>(
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
  const notifications = await getNotificationBars();

  return (
    <>
      <NotificationBar
        position={NotificationBarPosition.Top}
        data={notifications}
      />
      <nav className="sticky top-0 z-30 bg-sand">
        <DesktopMenuAdditionalLinks />
        <header className="shadow-header-menu backdrop-blur-lg py-4 bg-white min-h-[80px] tracking-wide flex items-center">
          <ContainerLayout className="flex items-center justify-between">
            <DesktopMenu data={data} />
            <MobileMenu data={data} />
            <Logo />
            <Actions />
          </ContainerLayout>
        </header>
        <div className="relative -z-10">
          <NotificationBar
            id="under-menu-notification-bar"
            position={NotificationBarPosition.UnderMenu}
            data={notifications}
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-30">
          <NotificationBar
            position={NotificationBarPosition.Bottom}
            data={notifications}
          />
        </div>
      </nav>
    </>
  );
}
