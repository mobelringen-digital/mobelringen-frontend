import React, { Suspense } from "react";

import { CmsDynamicHeaders } from "@/components/cms/dynamic-header/CmsDynamicHeaders";
import { Footer } from "@/components/footer/Footer";
import { HeaderMenu } from "@/components/header-menu";
import { Providers } from "@/components/Providers";

import Loading from "./loading";

import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="robots" content="noindex,nofollow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />

      <body className="bg-sand font-suisse">
        <Providers>
          <HeaderMenu />
          <CmsDynamicHeaders />
          <main className="min-h-[30vh]">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
