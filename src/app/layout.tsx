import React, { Suspense } from "react";

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
        <head>
          <title>Mobelringen</title>
          <meta name="robots" content="noindex,nofollow" />
        </head>
        <body className="bg-sand font-suisse">
          <HeaderMenu />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
