import React from "react";

import { GoogleTagManager } from "@next/third-parties/google";

import Script from "next/script";

import { CmsDynamicHeaders } from "@/components/cms/dynamic-header/CmsDynamicHeaders";
import { Footer } from "@/components/footer/Footer";
import { HeaderMenu } from "@/components/header-menu";
import { Providers } from "@/components/Providers";

import "./globals.scss";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ""} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />

      <body className="bg-sand font-suisse">
        <Script
          strategy="beforeInteractive"
          async={true}
          data-environment={process.env.NEXT_PUBLIC_KLARNA_ENVIRONMENT}
          src="https://js.klarna.com/web-sdk/v1/klarna.js"
          data-client-id={process.env.NEXT_PUBLIC_KLARNA_CLIENT_ID}
        />

        <Providers>
          <HeaderMenu />
          <CmsDynamicHeaders />
          <main className="min-h-[30vh] flex flex-col items-center justify-between w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
