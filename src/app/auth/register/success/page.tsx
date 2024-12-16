import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";

export default async function RegisterSuccess() {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <StaticPageContent url="/auth/register/success" />
    </Suspense>
  );
}
