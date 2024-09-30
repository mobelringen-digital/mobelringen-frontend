import React, { Suspense } from "react";

import { GoogleTagManager } from "@next/third-parties/google";

import { AuthServerComponent } from "@/components/auth-handler/AuthServerComponent";
import { CmsDynamicHeaders } from "@/components/cms/dynamic-header/CmsDynamicHeaders";
import { Footer } from "@/components/footer/Footer";
import { HeaderMenu } from "@/components/header-menu";
import { Providers } from "@/components/Providers";

import Loading from "./loading";

import "./globals.scss";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-NK7F7KF6" />
      <meta name="robots" content="noindex,nofollow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />

      <body className="bg-sand font-suisse">
        <AuthServerComponent />
        <Providers>
          <HeaderMenu />
          <CmsDynamicHeaders />
          <main className="min-h-[30vh] flex flex-col items-center justify-between w-full">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
