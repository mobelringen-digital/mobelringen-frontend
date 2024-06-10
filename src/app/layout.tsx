import React, { Suspense } from "react";

import Head from "next/head";

import { Footer } from "@/components/footer/Footer";
import { HeaderMenu } from "@/components/header-menu";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

import Loading from "./loading";

import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <Head>
          <meta name="robots" content="noindex,nofollow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>

        <body className="bg-sand font-suisse">
          <HeaderMenu />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
