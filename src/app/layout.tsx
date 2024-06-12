import React, { Suspense } from "react";

import { Loader } from "@/components/_ui/loader/Loader";
import { LoaderInnerWrapper } from "@/components/_ui/loader/LoaderInnerWrapper";
import { Footer } from "@/components/footer/Footer";
import { HeaderMenu } from "@/components/header-menu";
import { Providers } from "@/components/Providers";

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
          <main className="min-h-[30vh]">
            <Suspense
              fallback={
                <LoaderInnerWrapper>
                  <Loader />
                </LoaderInnerWrapper>
              }
            >
              {children}
            </Suspense>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
